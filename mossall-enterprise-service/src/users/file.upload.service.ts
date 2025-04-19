import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as csv from 'csv-parse';
import { UserCSVDTO } from './dto/usercsv.dto';
import { readFileSync, unlink } from 'fs';
import { UserService } from './user.service';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import { generatePassword } from '~/commons/utils';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as xlsx from 'xlsx';
import { UserRole } from './enums/user-role.enum';
import { CategorySocioproService } from '~/category-sociopro/services/category-sociopro.service';

@Injectable()
export class FileUploadService {
  #logger: Logger;
  constructor(
    private userService: UserService,
    private eventEmitter: EventEmitter2,
    private categoryService: CategorySocioproService,
  ) {
    this.#logger = new Logger(`🖇️ ${FileUploadService.name}Service🖇️`);
  }
  async validateFileRow(rowData: any, organization: string, type: UserRole) {
    const errors: string[] = [];

    const mappedRowData = {
      firstName: rowData['Prénom'],
      lastName: rowData['Nom'],
      email: rowData['Adresse mail'],
      phoneNumber: rowData['Numéro téléphone'],
      address: rowData['Adresse postale'],
      uniqueIdentifier: rowData['Matricule'],
      position: rowData['Fonction'],
      birthDate: rowData['Date de naissance'],
      salary: rowData['Salaire'],
      categorySocioPro: rowData['Catégorie socioprofessionnelle'],
      realm:
        type == UserRole.COLLABORATOR
          ? 'mossall_collaborators'
          : 'mossall_admin',
    };
    // Validation du format du numéro de téléphone
    const phoneRegex = /^(78|77|76|70|75)\d{7}$/;
    if (rowData['Téléphone'] && !phoneRegex.test(rowData['Téléphone'])) {
      errors.push(
        `Le numéro de téléphone ${rowData['Téléphone']} est invalide. Il doit commencer par 70, 75, 76, 77 ou 78 et avoir 9 chiffres au total`,
      );
    }
    if (rowData['Catégorie socioprofessionnelle']) {
      const category = await this.categoryService.findOne({
        title: {
          $regex: new RegExp(
            rowData['Catégorie socioprofessionnelle'].trim(),
            'i',
          ),
        },
      });

      mappedRowData.categorySocioPro = category?._id;
      if (!category) {
        errors.push(
          `La catégorie socioprofessionnelle ${rowData['Catégorie socioprofessionnelle']} n'existe pas`,
        );
      }
    }

    const csvDto = this.mapToUserDto(mappedRowData, organization, type);

    const validationErrors = await validate(csvDto);
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        const { property, constraints } = error;
        const errorMessage = `${property}: ${Object.values(constraints).join(
          ', ',
        )}`;
        errors.push(errorMessage);
      });
    }

    return { errors, data: csvDto };
  }

  // Mapper les données brutes vers le DTO utilisateur
  private mapToUserDto(
    rowData: any,
    organization: string,
    type: UserRole,
  ): UserCSVDTO {
    const csvDto = plainToInstance(UserCSVDTO, rowData);
    csvDto.role = type;
    csvDto.organization = organization;
    csvDto.password = generatePassword(12, {
      numbers: true,
      uppercase: true,
      symbols: true,
    });
    csvDto.birthDate = moment(csvDto.birthDate, 'DD-MM-YYYY').toDate();
    csvDto.categorySocioPro = rowData.categorySocioPro;
    return csvDto;
  }
  // Fonction pour mapper une ligne à un objet basé sur les en-têtes
  private mapRowToDataObject(row: any[], headers: any[]): any {
    const mappedRowData = {};
    headers.forEach((header, index) => {
      mappedRowData[header] = row[index];
    });
    return mappedRowData;
  }
  async validateXlsxData(
    file: Express.Multer.File,
    organization: string,
    type: UserRole,
  ): Promise<any> {
    // Read the XLSX file
    const workbook = xlsx.readFile(file.path, { cellDates: true });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON format
    const parsedData: any[] = xlsx.utils.sheet_to_json(sheet, {
      header: 1, // include the headers
      defval: '', // default value for empty cells
    });
    const filteredData = parsedData.filter((row) =>
      row.some((cell) =>
        typeof cell === 'string' ? cell.trim() !== '' : cell !== '',
      ),
    );
    const errors: string[] = [];

    // Check if file is empty
    if (filteredData.length <= 1) {
      // Assuming the first row is header
      errors.push('Empty File Provided');
      unlink(file.path, () => {}); // Clean up file
      return {
        error: true,
        message: 'File Validation Failed',
        errorsArray: errors,
        valid: false,
      };
    }
    // Récupérer les en-têtes
    const headers = parsedData[0];
    const errorRows = [];
    const data = [];

    // Validate All Rows (skip the header row)
    for (const [index, rowData] of filteredData.slice(1).entries()) {
      const mappedRowData = this.mapRowToDataObject(rowData, headers);
      const { errors: validationErrors, data: dataValidated } =
        await this.validateFileRow(mappedRowData, organization, type);
      data.push({ ...dataValidated, error: false, errorsArray: [] });

      if (validationErrors.length) {
        data[index] = {
          ...data[index],
          error: true,
          errorsArray: validationErrors,
        };
        errorRows.push({
          error: true,
          message: `File Rows Validation Failed at row: ${index + 2}`, // +2 to account for the 0-based index and header row
          errorsArray: validationErrors,
        });
      }
    }

    unlink(file.path, () => {}); // Clean up file

    return {
      data,
      errorsArray: errorRows,
      nbRowErrors: errorRows.length,
      total_rows: data.length,
      nbRowsSuccess: data.length - errorRows.length,
    };
  }

  async uploadCsvFile(
    file: Express.Multer.File,
    organization: string,
    type: UserRole,
  ): Promise<any> {
    try {
      this.#logger.log('uploading csv file');
      let response = await this.validateXlsxData(file, organization, type);
      let { data, errorsArray, nbRowErrors, total_rows, nbRowsSuccess } =
        response;
      this.#logger.log('data validated');
      if (data.length) {
        this.#logger.log('processing file');
        return this.processFile(data);
      }
      this.#logger.log('returning error');
      return {
        error: true,
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'errors on data',
        errorsArray,
        data,
        nbRowErrors,
        total_rows,
        nbRowsSuccess,
      };
    } catch (e) {
      throw new InternalServerErrorException(
        e?.message || 'Internal Server Error',
      );
    }
  }
  async processFile(dataRows: any[]) {
    const emails = dataRows.map((row) => row.email);

    this.#logger.log('processing file with ' + emails.length + ' rows');
    const { dataRows: existingInfoUsers, errorRows: errorRows } =
      await this.checkDuplicateRows(dataRows);
    this.#logger.log('inserting rows in database');
    const dataToinsert = existingInfoUsers.filter((row) => row.error == false);

    const rowsInserted = await this.insertRowsInDb(dataToinsert);

    const totalErrors = existingInfoUsers.filter((item) => item.error)?.length;
    return {
      message:
        errorRows.length > 0
          ? 'errors on data'
          : 'file validation successfully done.Insert data is successfully done. ',
      data: dataRows.map((row) => {
        if (!row.error) {
          const temp = rowsInserted.find((item) => item.email === row.email);
          row = {
            ...row,
            createdAt: temp?.createdAt,
            updatedAt: temp?.updatedAt,
            id: temp?._id,
            balance: temp?.balance,
            totalDemandeAmount: temp?.totalDemandeAmount,
          };
        }
        delete row.password;
        return row;
      }),
      error: !!existingInfoUsers.length,
      errorsArray: errorRows,
      totalRows: dataRows.length,
      totalErrors,
      totalSuccess: dataRows.length - totalErrors,
    };
  }

  async insertRowsInDb(dataRows: any[]) {
    this.#logger.log('inserting rows in database');
    this.#logger.log('data to insert: ' + dataRows.length);
    let response = [];
    if (dataRows.length) {
      this.#logger.log(
        'file inserted in database' + dataRows.map((row) => row.email),
      );
      response = await this.userService.insertMany(
        dataRows.map((row) => {
          const temp = { ...row, password: bcrypt.hashSync(row.password, 10) };
          delete temp.error;
          delete temp.errorsArray;
          return temp;
        }),
      );
      dataRows.forEach((row) => {
        this.#logger.log(
          'emitting event sending email and password to ' + row.email,
        );
        this.eventEmitter.emit('collaborator.invite', {
          email: row.email,
          password: row.password,
        });
      });
    }

    const rowsInserted = await this.userService.findMany({
      email: { $in: response.map((row) => row.email) },
    });
    return rowsInserted;
  }
  async checkDuplicateRows(dataRows: any[]) {
    this.#logger.log('Vérification des doublons dans les lignes du fichier');
    let tempData = [...dataRows];
    const errorRows = [];

    // Recherche des utilisateurs existants
    const existingInfoUsers = await this.userService.findMany({
      $or: [
        {
          $and: [
            { phoneNumber: { $in: dataRows.map((row) => row.phoneNumber) } },
            { realm: 'mossall_collaborators' },
            { organization: new ObjectId(dataRows[0].organization) },
          ],
        },
        { email: { $in: dataRows.map((row) => row.email) } },
        {
          uniqueIdentifier: {
            $in: dataRows.map((row) => row.uniqueIdentifier),
          },
        },
      ],
    });

    this.#logger.log(
      'file processed with ' + existingInfoUsers.length + ' rows',
    );

    if (existingInfoUsers.length > 0) {
      tempData = tempData.map((row, index) => {
        const duplicates = [];

        // Vérification du numéro de téléphone
        const duplicatePhone = existingInfoUsers.find(
          (user) =>
            user.phoneNumber === row.phoneNumber &&
            (user.realm === 'mossall_collaborators' || user.realm) &&
            user.organization.toString() === row.organization,
        );
        if (duplicatePhone) {
          duplicates.push(
            `Le numéro de téléphone ${row.phoneNumber} existe déjà`,
          );
        }

        // Vérification de l'email
        const duplicateEmail = existingInfoUsers.find(
          (user) => user.email === row.email,
        );
        if (duplicateEmail) {
          duplicates.push(`L'email ${row.email} existe déjà`);
        }
        // Vérification de l'identifiant unique
        const duplicateIdentifier = existingInfoUsers.find(
          (user) =>
            user.uniqueIdentifier === row.uniqueIdentifier &&
            user.realm === 'mossall_collaborators' &&
            user.organization.toString() === row.organization,
        );
        if (duplicateIdentifier) {
          duplicates.push(
            `L'identifiant unique ${row.uniqueIdentifier} existe déjà`,
          );
        }
        // Si des doublons sont trouvés
        if (duplicates.length > 0) {
          errorRows.push({
            error: true,
            message: 'Données en double détectées',
            errorsArray: duplicates,
          });
          dataRows[index].error = true;
          dataRows[index].errorsArray = duplicates;
        }

        return dataRows[index];
      });
    }

    return {
      dataRows: tempData,
      errorRows,
    };
  }
}

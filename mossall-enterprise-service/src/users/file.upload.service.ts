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
import { exit } from 'process';

@Injectable()
export class FileUploadService {
  #logger: Logger;
  constructor(
    private userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {
    this.#logger = new Logger(`🖇️ ${FileUploadService.name}Service🖇️`);
  }
  async validateFileRow(rowData, organization: string) {
    const errors: string[] = [];
    const csvDto = plainToInstance(UserCSVDTO, rowData);
    csvDto.realm = 'mossall_collaborators';
    csvDto.role = 'COLLABORATOR';
    csvDto.organization = organization;
    csvDto.password = generatePassword(12, {
      numbers: true,
      uppercase: true,
      symbols: true,
    });
    csvDto.birthDate = moment(csvDto.birthDate, 'DD-MM-YYYY').toDate();

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

  async validateCsvData(
    file: Express.Multer.File,
    organization: string,
  ): Promise<any> {
    const csvContent = readFileSync(file.path);
    const parsedData: any = await new Promise((resolve, reject) => {
      csv.parse(
        csvContent,
        {
          columns: true,
          relax_quotes: true,
          skip_empty_lines: true,
          cast: true,
          delimiter: ',',
        },
        (err, records) => {
          if (err) {
            reject(err);
            return { error: true, message: 'Unable to parse file' };
          }
          resolve(records);
        },
      );
    });
    const errors: string[] = [];
    if (!parsedData.length) {
      errors.push('Empty File Provided');
      return {
        error: true,
        message: 'File Validation Failed',
        errorsArray: errors,
        valid: false,
      };
    }
    //validate All Rows
    const errorRows = [];
    const data = [];
    for await (const [index, rowData] of parsedData.entries()) {
      const { errors: validationErrors, data: dataValidated } =
        await this.validateFileRow(rowData, organization);
      data.push({ ...dataValidated, error: false, errorsArray: [] });
      if (validationErrors.length) {
        data[index] = {
          ...data[index],
          error: true,
          errorsArray: validationErrors,
        };
        errorRows.push({
          error: true,
          message: `File Rows Validation Failed at row: ${index + 1}`,
          errorsArray: validationErrors,
        });
      }
    }
    unlink(file.path, () => {});
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
  ): Promise<any> {
    try {
      this.#logger.log('uploading csv file');
      let response = await this.validateCsvData(file, organization);
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
    this.#logger.log('checking duplicate rows');
    let tempData = [...dataRows];
    const errorRows = [];
    const existingInfoUsers = await this.userService.findMany({
      $or: [
        { email: { $in: dataRows.map((row) => row.email) } },
        { uniqueIdentifier: dataRows.map((row) => row.uniqueIdentifier) },
        { bankAccountNumber: dataRows.map((row) => row.bankAccountNumber) },
        { phoneNumber: dataRows.map((row) => row.phoneNumber) },
      ],
    });
    this.#logger.log(
      'file processed with ' + existingInfoUsers.length + ' rows',
    );
    if (existingInfoUsers.length) {
      this.#logger.log(`${existingInfoUsers.length} emails already exist`);
      tempData = tempData.map((row, index) => {
        const find = existingInfoUsers.find((user) => user.email === row.email);
        if (find) {
          errorRows.push({
            error: true,
            message: `email already exists`,
            errorsArray: [find.email],
          });
          dataRows[index].error = true;
          dataRows[index].errorsArray.push(`${find.email} already exists`);
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

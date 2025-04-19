import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as xlsx from 'xlsx';

import { readFileSync, unlink } from 'fs';
import * as csv from 'csv-parse';
import { DemandeDto } from '../dto/demande.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { DemandeService } from './demande.service';
import { UserService } from '~/users/user.service';
import { UserRole } from '~/users/enums/user-role.enum';
import { DemandeStatus } from '../enums/demande-status.enum';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { OrganisationService } from '~/organisation-service/dto/organisation-service.entity';
import { ServiceService } from '~/service/services/service.service';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { ObjectId } from 'bson';
import { WaveFees } from '../demande.utils';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { start } from 'repl';
import { Demande } from '../dto/demande.entity';

@Injectable()
export class DemandeFileService {
  #logger: Logger;

  constructor(
    private demandeService: DemandeService,
    private userService: UserService,
    private organisationService: OrganisationServiceService,
    private produitService: ServiceService,
  ) {
    this.#logger = new Logger(`🖇️${DemandeFileService.name}🖇️`);
  }

  async uploadFile(
    file: Express.Multer.File,
    organization: IOrganization,
    admin: IUser,
  ) {
    try {
      this.#logger.log(`uploading file demande`);
      let response = await this.validateXlsxData(file, organization.id);
      let { data, errorsArray, nbRowErrors, total_rows, nbRowsSuccess } =
        response;
      this.#logger.log('data validated');
      if (data.length !== data.filter((item) => item.error).length) {
        this.#logger.log('processing file');
        return this.processFile(data, admin, organization);
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
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Internal Server Error',
      );
    }
  }

  async validateXlsxData(file: Express.Multer.File, organization: string) {
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
    this.#logger.log(`validating file rows ${parsedData.length}`);
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
    const headers = parsedData[0];

    const errorRows = [];
    const data = [];
    for (const [index, rowData] of filteredData.slice(1).entries()) {
      const mappedRowData = this.mapRowToDataObject(rowData, headers);
      const { errors: validationErrors, data: dataValidated } =
        await this.validateFileRow(mappedRowData, organization);
      data.push({ ...dataValidated, error: false, errorsArray: [] });
      this.#logger.log(`validating row ${index + 1}`);
      if (validationErrors?.length) {
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
  private mapRowToDataObject(row: any[], headers: any[]): any {
    const mappedRowData = {};
    headers.forEach((header, index) => {
      mappedRowData[header] = row[index];
    });
    return mappedRowData;
  }

  async validateFileRow(rowData, organization: string) {
    const errors: string[] = [];
    const mappedRowData = {
      firstName: rowData['Prenom'],
      lastName: rowData['Nom'],
      email: rowData['Email'],
      uniqueIdentifier: rowData['Identifiant unique'],
      phoneNumber: rowData['Telephone'],
      amount: rowData['Montant'],
      versed: rowData['Avance renboursée'],
      service: rowData['Service'],
      organization, // Direct assignment
    };
    this.#logger.log('converting to instance DemandeDto');
    const csvDto = plainToInstance(DemandeDto, mappedRowData);
    csvDto.organization = organization;
    const validationErrors = await validate(csvDto);
    this.#logger.log(`Validation errors: ${JSON.stringify(validationErrors)}`);

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

  async processFile(
    dataRows: (DemandeDto & { error: boolean; errorsArray: string[] })[],
    admin: IUser,
    organization: IOrganization,
  ) {
    this.#logger.log(`processing file demande`);

    // Process each row independently
    const processedRows = await Promise.all(
      dataRows.map(async (row) => {
        const errors = [];

        // 1. Find user by email, uniqueIdentifier, and phoneNumber
        const user = await this.userService.findOne({
          $and: [
            { email: row.email },
            { uniqueIdentifier: row.uniqueIdentifier },
            { phoneNumber: row.phoneNumber },
            { role: UserRole.COLLABORATOR },
          ],
        });

        if (!user) {
          errors.push(
            `Aucun utilisateur trouvé avec cet email: ${row.email}, identifiant: ${row.uniqueIdentifier} et téléphone: ${row.phoneNumber}`,
          );
          return {
            ...row,
            error: true,
            errorsArray: errors,
          };
        }

        // 2. Verify firstName and lastName
        if (
          user.firstName !== row.firstName ||
          user.lastName !== row.lastName
        ) {
          errors.push(
            `Le nom et prénom ne correspondent pas pour l'utilisateur ${row.email}`,
          );
          return {
            ...row,
            error: true,
            errorsArray: errors,
          };
        }
        this.#logger.log(`Find service ${row.service}`);

        // 3. Find service and organization service

        const serviceCorresponding = await this.produitService.findOne({
          title: row.service.trim(),
        });
        if (!serviceCorresponding) {
          this.#logger.log(`Service not found ${row.service}`);
          errors.push(`Aucun service trouvé avec ce nom ${row.service}`);
          return {
            ...row,
            error: true,
            errorsArray: errors,
          };
        }
        const organizationServiceCorresponding =
          await this.organisationService.findOne({
            serviceId: new ObjectId(serviceCorresponding.id),
            organizationId: admin.organization,
          });

        if (!organizationServiceCorresponding) {
          errors.push(
            `Aucune organisation  trouvé avec une service  ${row.service}`,
          );
          return {
            ...row,
            error: true,
            errorsArray: errors,
          };
        }
        // 3. Get all validated demands for this user and service
        const { demandeDeadlineDay } = organization;
        const startDate = new Date();
        startDate.setDate(demandeDeadlineDay);
        startDate.setMonth(startDate.getMonth() - 1);

        const endDate = new Date();
        endDate.setDate(demandeDeadlineDay);
        const demande = await this.getDemandeOnOneService(
          user._id,
          organizationServiceCorresponding.id,
          DemandeStatus.VALIDATED,
          { startDate, endDate },
        );
        console.log('demande', demande);

        // 4. Verify if amount matches
        if (demande && demande?.amount !== row.amount) {
          errors.push(
            `Le montant total des demandes (${demande.amount}) ne correspond pas au montant indiqué (${row.amount})`,
          );
          return {
            ...row,
            error: true,
            errorsArray: errors,
          };
        }
        const userDemands = await this.demandeService.findMany({
          owner: user._id,
          organizationServiceId: organizationServiceCorresponding._id,
          status: DemandeStatus.VALIDATED,
          createdAt: { $gte: startDate, $lt: endDate },
        });

        // 5. Check versed amount
        if (row.versed) {
          // If versed amount is specified, process payment
          try {
            // Update demands as paid
            for (const demand of userDemands) {
              await this.demandeService.paye(demand._id, admin);
            }

            return {
              ...row,
              error: false,
              errorsArray: [],
            };
          } catch (error) {
            errors.push(`Erreur lors du paiement: ${error.message}`);
            return {
              ...row,
              error: true,
              errorsArray: errors,
            };
          }
        } else {
          errors.push(`Aucun montant versé spécifié pour ${row.email}`);
          return {
            ...row,
            error: true,
            errorsArray: errors,
          };
        }
      }),
    );

    this.#logger.log(`Finished processing ${processedRows.length} rows`);

    return {
      data: processedRows,
      totalProcessed: processedRows.length,
      successCount: processedRows.filter((row) => !row.error).length,
      errorCount: processedRows.filter((row) => row.error).length,
    };
  }

  async getDemandeOnOneService(
    owner: string,
    organizationServiceId: string,
    status: DemandeStatus,
    date: {
      startDate: Date;
      endDate: Date;
    },
  ) {
    console.log({
      owner: new ObjectId(owner),
      organizationServiceId: new ObjectId(organizationServiceId),
      status,
      createdAt: {
        $gte: new Date(date.startDate),
        $lt: new Date(date.endDate),
      },
    });

    return this.demandeService.aggregateOne<Demande>([
      {
        $match: {
          owner: new ObjectId(owner),
          organizationServiceId: new ObjectId(organizationServiceId),
          status,
          createdAt: {
            $gte: new Date(date.startDate),
            $lt: new Date(date.endDate),
          },
        },
      },
      {
        $project: {
          owner: 1, // Inclut le champ owner
          organizationServiceId: 1, // Inclut le champ organizationServiceId
          amount: {
            $add: ['$amount', { $multiply: ['$amount', WaveFees] }], // Calcule le montant avec les frais
          },
        },
      },
      {
        $group: {
          _id: {
            owner: '$owner', // Groupe par owner
            organizationServiceId: '$organizationServiceId', // Groupe par organizationServiceId
          },
          amount: { $sum: '$amount' }, // Somme des montants
        },
      },
      {
        $project: {
          _id: 0, // Exclut le champ _id
          owner: '$_id.owner', // Inclut le champ owner
          organizationServiceId: '$_id.organizationServiceId', // Inclut le champ organizationServiceId
          amount: 1, // Inclut le champ totalAmount
        },
      },
    ]);
  }
}

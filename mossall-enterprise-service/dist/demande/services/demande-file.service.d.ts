/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { DemandeDto } from '../dto/demande.dto';
import { DemandeService } from './demande.service';
import { UserService } from '~/users/user.service';
import { DemandeStatus } from '../enums/demande-status.enum';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { ServiceService } from '~/service/services/service.service';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { Demande } from '../dto/demande.entity';
export declare class DemandeFileService {
    #private;
    private demandeService;
    private userService;
    private organisationService;
    private produitService;
    constructor(demandeService: DemandeService, userService: UserService, organisationService: OrganisationServiceService, produitService: ServiceService);
    uploadFile(file: Express.Multer.File, organization: IOrganization, admin: IUser): Promise<{
        data: {
            error: boolean;
            errorsArray: any[];
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            amount: number;
            uniqueIdentifier: string;
            versed: boolean;
            organization: string;
            service: string;
        }[];
        totalProcessed: number;
        successCount: number;
        errorCount: number;
    } | {
        error: boolean;
        statusCode: HttpStatus;
        message: string;
        errorsArray: any[] | string[];
        data: any[];
        nbRowErrors: number;
        total_rows: number;
        nbRowsSuccess: number;
    }>;
    validateXlsxData(file: Express.Multer.File, organization: string): Promise<{
        error: boolean;
        message: string;
        errorsArray: string[];
        valid: boolean;
        data?: undefined;
        nbRowErrors?: undefined;
        total_rows?: undefined;
        nbRowsSuccess?: undefined;
    } | {
        data: any[];
        errorsArray: any[];
        nbRowErrors: number;
        total_rows: number;
        nbRowsSuccess: number;
        error?: undefined;
        message?: undefined;
        valid?: undefined;
    }>;
    private mapRowToDataObject;
    validateFileRow(rowData: any, organization: string): Promise<{
        errors: string[];
        data: DemandeDto;
    }>;
    processFile(dataRows: (DemandeDto & {
        error: boolean;
        errorsArray: string[];
    })[], admin: IUser, organization: IOrganization): Promise<{
        data: {
            error: boolean;
            errorsArray: any[];
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            amount: number;
            uniqueIdentifier: string;
            versed: boolean;
            organization: string;
            service: string;
        }[];
        totalProcessed: number;
        successCount: number;
        errorCount: number;
    }>;
    getDemandeOnOneService(owner: string, organizationServiceId: string, status: DemandeStatus, date: {
        startDate: Date;
        endDate: Date;
    }): Promise<Demande>;
}

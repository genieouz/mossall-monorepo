/// <reference types="multer" />
import { DemandeFileService } from '~/demande/services/demande-file.service';
import { DemandeService } from '~/demande/services/demande.service';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { IUser } from '~/users/schemas/interfaces/user.interface';
export declare class DemandeController {
    private demandeFileService;
    private readonly demandeService;
    constructor(demandeFileService: DemandeFileService, demandeService: DemandeService);
    uploadDemandes(payload: any, file: Express.Multer.File, organization: IOrganization, user: IUser): Promise<{
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
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        errorsArray: any[] | string[];
        data: any[];
        nbRowErrors: number;
        total_rows: number;
        nbRowsSuccess: number;
    }>;
    autoValidateDemandes(payload: {
        demandeId: string;
        user: IUser;
    }): Promise<boolean>;
}

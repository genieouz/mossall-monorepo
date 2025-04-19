/// <reference types="multer" />
import { UserCSVDTO } from './dto/usercsv.dto';
import { UserService } from './user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRole } from './enums/user-role.enum';
import { CategorySocioproService } from '~/category-sociopro/services/category-sociopro.service';
export declare class FileUploadService {
    #private;
    private userService;
    private eventEmitter;
    private categoryService;
    constructor(userService: UserService, eventEmitter: EventEmitter2, categoryService: CategorySocioproService);
    validateFileRow(rowData: any, organization: string, type: UserRole): Promise<{
        errors: string[];
        data: UserCSVDTO;
    }>;
    private mapToUserDto;
    private mapRowToDataObject;
    validateXlsxData(file: Express.Multer.File, organization: string, type: UserRole): Promise<any>;
    uploadCsvFile(file: Express.Multer.File, organization: string, type: UserRole): Promise<any>;
    processFile(dataRows: any[]): Promise<{
        message: string;
        data: any[];
        error: boolean;
        errorsArray: any[];
        totalRows: number;
        totalErrors: number;
        totalSuccess: number;
    }>;
    insertRowsInDb(dataRows: any[]): Promise<import("./schemas/interfaces/user.interface").IUser[]>;
    checkDuplicateRows(dataRows: any[]): Promise<{
        dataRows: any[];
        errorRows: any[];
    }>;
}

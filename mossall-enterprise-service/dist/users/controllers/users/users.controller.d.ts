/// <reference types="multer" />
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { UserRole } from '~/users/enums/user-role.enum';
import { FileUploadService } from '~/users/file.upload.service';
export declare class UsersController {
    private fileUploadService;
    constructor(fileUploadService: FileUploadService);
    addUsers(payload: any, file: Express.Multer.File, organization: IOrganization, type: UserRole): Promise<any>;
}

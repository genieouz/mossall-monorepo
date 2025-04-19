import { UpdateMyAdminProfileInput } from '../dto/user.input';
import { IUser } from '../schemas/interfaces/user.interface';
import { UserService } from '../user.service';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { UserFilterInput } from '../dto/user.filter';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    updateMyAdminPassword(oldPassword: string, newPassword: string, user: IUser): Promise<boolean>;
    lockUser(userId: string, user: IUser): Promise<boolean>;
    unlockUser(userId: string, user: IUser): Promise<boolean>;
    enableEmailNotification(userId: string, org: IOrganization): Promise<boolean>;
    disableEmailNotification(userId: string, org: IOrganization): Promise<boolean>;
    fetchCurrentAdmin(user: IUser): Promise<IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateMyAdminProfile(userInput: UpdateMyAdminProfileInput, user: IUser): Promise<boolean>;
    phoneNumberExists(phoneNumber: string, userId: string, isAdmin: boolean, user: IUser): Promise<boolean>;
    uniqueIdentifierExists(uniqueIdentifier: string, userId: string, isAdmin: boolean, user: IUser): Promise<boolean>;
    bankAccountNumberExists(bankAccountNumber: string, userId: string, isAdmin: boolean, user: IUser): Promise<boolean>;
    emailExists(email: string, userId: string, isAdmin: boolean, user: IUser): Promise<boolean>;
    upladFile(file: String, destination: String): Promise<boolean>;
    fetchCollaboratorCount(org: IOrganization, filter: UserFilterInput): Promise<number>;
}

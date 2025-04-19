import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { UpdateCollaboratorInput } from '~/collaborators/dto/update-collaborator.input';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { DemandesMetricsInput } from '~/demande/dto/demandes-metrics.input';
import { UpdateMyAdminProfileInput } from './dto/user.input';
import { IUser } from './schemas/interfaces/user.interface';
import { PaginationInfo } from '~/commons/graphql/pagination';
export declare class UserService extends AbstractService<IUser> {
    private httpService;
    url: string;
    constructor(model: Model<IUser>, httpService: HttpService);
    findById(id: string): Promise<IUser>;
    checkExistingFieldValue(organization: string, fieldName: string, fieldValue: string, isAdmin: boolean, entityId: string): Promise<boolean>;
    findByIdOrFail(_id: string): Promise<IUser>;
    updateMyAdminPassword(user: IUser, password: string, newPassword: string): Promise<boolean>;
    resetPassword(userId: string, newPassword: string): Promise<boolean>;
    updateUser(userId: string, payload: UpdateCollaboratorInput): Promise<boolean>;
    updateMyProfile(userId: string, payload: UpdateMyAdminProfileInput): Promise<boolean>;
    getUserById(_id: string): Promise<IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    fetchMyCollaborators(organization: string, metricsInput: DemandesMetricsInput): Promise<{
        results: IUser[];
        pagination: PaginationInfo;
    } | IUser[]>;
    fetchMyAdmins(organization: string): Promise<IUser[]>;
    fetchCollaboratorsThatHasPendingDemandes(queryConfig: any, queryFilter: any): Promise<any>;
}

import { Timestamps } from "~/commons/graphql/types/timestamps/timestamps.entity";
import { IOrganization } from "~/organization/schemas/interfaces/organization.interface";
import { IUser } from "~/users/schemas/interfaces/user.interface";
import { ActivityScope } from "../enums/activity-scope.enum";
export declare class Activity extends Timestamps {
    id: string;
    message: string;
    initialValue?: any;
    currentValue?: any;
    meta?: any;
    user: IUser;
    scope: ActivityScope;
    organization: IOrganization;
}
declare const PaginatedActivityResult_base: any;
export declare class PaginatedActivityResult extends PaginatedActivityResult_base {
}
export {};

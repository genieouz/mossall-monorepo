import { IOrganization } from "~/organization/schemas/interfaces/organization.interface";
import { OrganizationService } from "~/organization/services/organization.service";
import { IUser } from "~/users/schemas/interfaces/user.interface";
import { UserService } from "~/users/user.service";
import { IActivity } from "../schemas/interfaces/activity.interface";
export declare class ActivityPropertyResolver {
    private readonly userService;
    private readonly organizationService;
    constructor(userService: UserService, organizationService: OrganizationService);
    user(activity: IActivity): Promise<IUser>;
    organization(activity: IActivity): Promise<IOrganization>;
}

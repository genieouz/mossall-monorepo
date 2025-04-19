import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Organization } from "~/organization/dto/organization.entity";
import { IOrganization } from "~/organization/schemas/interfaces/organization.interface";
import { OrganizationService } from "~/organization/services/organization.service";
import { User } from "~/users/dto/user.entity";
import { IUser } from "~/users/schemas/interfaces/user.interface";
import { UserService } from "~/users/user.service";
import { Activity } from "../dto/activity.entity";
import { IActivity } from "../schemas/interfaces/activity.interface";

@Resolver(of => Activity)
export class ActivityPropertyResolver {
    constructor(
        private readonly userService: UserService,
        private readonly organizationService: OrganizationService
    ) {}
    
    @ResolveField(returns => User)
    user(@Parent() activity: IActivity): Promise<IUser> {
        return this.userService.findOneById(activity.user);
    }

    @ResolveField(returns => Organization)
    organization(@Parent() activity: IActivity): Promise<IOrganization> {
        return this.organizationService.findOneById(activity.organization);
    }
}
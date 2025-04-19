import { Directive, Float, Int, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { DemandeService } from "~/demande/services/demande.service";
import { CurrentOrganization } from "~/organization/decorators/current-organization.decorator";
import { Organization } from "~/organization/dto/organization.entity";
import { IOrganization } from "~/organization/schemas/interfaces/organization.interface";
import { OrganizationService } from "~/organization/services/organization.service";
import { User } from "../dto/user.entity";
import { IUser } from "../schemas/interfaces/user.interface";

@Resolver(of => User)
export class UserPropertyResolver {
    constructor(
        private readonly demandeService: DemandeService,
        private organizationService: OrganizationService
    ) {}
    @ResolveField(returns => Float)
    async authorizedAdvance(@Parent() user: IUser): Promise<number> {
        // return Number(((user.salary || 0) * 0.75).toFixed(0))
        return this.demandeService.maxAmountAuthorized(user);
    }

    @ResolveField(returns => Float)
    async totalDemandeAmount(@Parent() user: IUser): Promise<number> {
        // return Number(((user.salary || 0) * 0.75).toFixed(0))
        return this.demandeService.getTotalDemandeAmount(user);
    }

    @ResolveField(returns => Float)
    async balance(
        @Parent() user: IUser,
    ): Promise<number> {
        // return Number(((user.salary || 0) * 0.75).toFixed(0))
        return this.demandeService.getBalance(user);
    }

    @ResolveField(returns => Organization)
    async organization(
        @Parent() user: IUser,
        @CurrentOrganization() organization: IOrganization
    ): Promise<IOrganization> {
        return this.organizationService.findOneById(user.organization);
        // return organization;
    }
}

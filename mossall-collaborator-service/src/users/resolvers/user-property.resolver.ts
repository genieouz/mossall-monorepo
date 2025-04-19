import {
  Float,
  Parent,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { DemandeService } from '~/demande/services/demande.service';
import { User } from '../dto/user.entity';
import { IUser } from '../schemas/interfaces/user.interface';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { OrganizationService } from '~/organization/services/organization.service';
import { Organization } from '~/organization/dto/organization.entity';
import { CurrentOrganization } from '~/organization/decorators/current-organization.decorator';

@Resolver((of) => User)
export class UserPropertyResolver {
  constructor(
    private demandeService: DemandeService,
    private organizationService: OrganizationService,
  ) {}

  @ResolveProperty((returns) => Float)
  async balance(@Parent() user: IUser) {
    return this.demandeService.getBalance(user);
  }

  @ResolveField((returns) => Organization)
  async organization(
    @Parent() user: IUser,
    @CurrentOrganization() organization: IOrganization,
  ): Promise<IOrganization> {
    return this.organizationService.findOneById(user.organization);
    // return organization;
  }
}

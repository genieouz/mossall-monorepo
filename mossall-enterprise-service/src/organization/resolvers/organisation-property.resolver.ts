import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Organization } from '~/organization/dto/organization.entity';

import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { IOrganization } from '../schemas/interfaces/organization.interface';
import { OrganisationService } from '~/organisation-service/dto/organisation-service.entity';

@Resolver((of) => Organization)
export class OrganizationPropertyResolver {
  constructor(private organisationServiceService: OrganisationServiceService) {}

  @ResolveField((returns) => [OrganisationService], { nullable: true })
  async organisationService(@Parent() organization: IOrganization) {
    return this.organisationServiceService.findMany({
      organizationId: organization._id,
    });
  }
}

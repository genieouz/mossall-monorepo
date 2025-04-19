import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OrganisationService } from '../dto/organisation-service.entity';
import { Organization } from '~/organization/dto/organization.entity';
import { IOrganisationService } from '../schemas/interfaces/organisation-service.interface';
import { OrganizationService } from '~/organization/services/organization.service';
import { Event } from '~/event/dto/event.entity';
import { EventService } from '~/event/services/event.service';
import { Service } from '~/service/dto/service.entity';
import { ServiceService } from '~/service/services/service.service';
import { Demande } from '~/demande/dto/demande.entity';
import { DemandeService } from '~/demande/services/demande.service';
import { CategorySocioproServiceService } from '~/category-sociopro-service/services/category-sociopro-service.service';
import { CategorySocioproService } from '~/category-sociopro-service/dto/category-sociopro-service.entity';

@Resolver((of) => OrganisationService)
export class OrganizationServicePropertyResolver {
  constructor(
    private organizationService: OrganizationService,
    private eventService: EventService,
    private serviceService: ServiceService,
    private categorySocioproService: CategorySocioproServiceService,
    private demandeService: DemandeService,
  ) {}

  @ResolveField((returns) => Organization)
  async organization(@Parent() _organizationService: IOrganisationService) {
    return this.organizationService.findOneById(
      _organizationService.organizationId,
    );
  }

  @ResolveField((returns) => Service)
  async service(@Parent() _organizationService: IOrganisationService) {
    return this.serviceService.findOneById(_organizationService.serviceId);
  }

  @ResolveField((returns) => [Event], { nullable: true })
  async events(@Parent() _organizationService: IOrganisationService) {
    return this.eventService.findMany({
      organizationServiceId: _organizationService._id,
    });
  }

  @ResolveField((returns) => [CategorySocioproService], { nullable: true })
  async categoriesocioproservices(
    @Parent() _organizationService: IOrganisationService,
  ) {
    return this.categorySocioproService.findMany({
      organisationServiceId: _organizationService._id,
    });
  }

  @ResolveField((returns) => [Demande], { nullable: true })
  async demandes(@Parent() _organizationService: IOrganisationService) {
    return this.demandeService.findMany({
      organizationServiceId: _organizationService._id,
    });
  }
}

import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { OrganisationService } from '~/organisation-service/dto/organisation-service.entity';
import { IEvent } from '../schemas/interfaces/event.interface';
import { Event } from '../dto/event.entity';

@Resolver((of) => Event)
export class EventPropertyResolver {
  constructor(
    private readonly organisationServiceService: OrganisationServiceService,
  ) {}

  @ResolveField((returns) => OrganisationService)
  organisationService(@Parent() event: IEvent) {
    return this.organisationServiceService.findOneById(
      event.organizationServiceId,
    );
  }
}

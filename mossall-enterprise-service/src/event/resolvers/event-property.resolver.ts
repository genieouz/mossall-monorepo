import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { OrganisationService } from '~/organisation-service/dto/organisation-service.entity';
import { IEvent } from '../schemas/interfaces/event.interface';
import { Event } from '../dto/event.entity';
import { CategorySocioproServiceService } from '~/category-sociopro-service/services/category-sociopro-service.service';
import { CategorySocioproService } from '~/category-sociopro-service/dto/category-sociopro-service.entity';

@Resolver((of) => Event)
export class EventPropertyResolver {
  constructor(
    private readonly organisationServiceService: OrganisationServiceService,
    private readonly categorySocioproServiceService: CategorySocioproServiceService,
  ) {}

  @ResolveField((returns) => OrganisationService)
  organisationService(@Parent() event: IEvent) {
    return this.organisationServiceService.findOneById(
      event.organizationServiceId,
    );
  }

  @ResolveField((returns) => [CategorySocioproService], { nullable: true })
  async categorySocioproServices(@Parent() event: IEvent) {
    return this.categorySocioproServiceService.findMany({
      eventId: event._id,
    });
  }
}

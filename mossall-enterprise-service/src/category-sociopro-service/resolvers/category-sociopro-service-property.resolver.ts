import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CategorySocioproService as CategorySocioproServiceEntity } from '../dto/category-sociopro-service.entity';
import { CategorySocioproService } from '~/category-sociopro/services/category-sociopro.service';
import { CategorySociopro } from '~/category-sociopro/dto/category-sociopro.entity';
import { OrganisationService } from '~/organisation-service/dto/organisation-service.entity';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { EventService } from '~/event/services/event.service';
import { Event } from '~/event/dto/event.entity';

@Resolver((of) => CategorySocioproServiceEntity)
export class CategorySocioproServicePropertyResolver {
  constructor(
    private readonly categorySocioproService: CategorySocioproService,
    private readonly organisationServiceService: OrganisationServiceService,
    private readonly eventService: EventService,
  ) {}

  @ResolveField((returns) => CategorySociopro, { nullable: true })
  async categorySociopro(
    @Parent() categorySocioproService: CategorySocioproServiceEntity,
  ) {
    return this.categorySocioproService.findOneById(
      categorySocioproService.categorySocioproId,
    );
  }

  @ResolveField((returns) => OrganisationService, { nullable: true })
  async organisationService(
    @Parent() categorySocioproService: CategorySocioproServiceEntity,
  ) {
    return this.organisationServiceService.findOneById(
      categorySocioproService.organisationServiceId,
    );
  }

  @ResolveField((returns) => Event, { nullable: true })
  async event(
    @Parent() categorySocioproService: CategorySocioproServiceEntity,
  ) {
    return this.eventService.findOneById(categorySocioproService.eventId);
  }
}

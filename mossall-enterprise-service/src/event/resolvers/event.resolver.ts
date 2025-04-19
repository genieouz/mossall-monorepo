import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { Event, PaginatedEventResult } from '../dto/event.entity';
import { EventInput } from '../dto/event.input';
import { EventUpdateInput } from '../dto/event.update.input';
import { IEvent } from '../schemas/interfaces/event.interface';
import { EventService } from '../services/event.service';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';
import { IPaginatedResult } from '~/commons/abstract/paginated-result';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { ServiceService } from '~/service/services/service.service';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { ObjectId } from 'bson';

@UseGuards(AuthGuard)
@Resolver()
export class EventResolver {
  constructor(
    private eventService: EventService,
    private organisationServiceService: OrganisationServiceService,
    private serviceService: ServiceService,
  ) {}

  @Mutation((returns) => Event)
  async createEvent(
    @Args({ name: 'eventInput', type: () => EventInput })
    eventInput: IEvent,
    @Args({ name: 'organizationServiceId', type: () => ID })
    organizationServiceId: string,
  ): Promise<IEvent> {
    const organisation =
      await this.organisationServiceService.findOneByIdOrFail(
        organizationServiceId,
      );

    await this.serviceService.findOneOrFail({
      _id: organisation.serviceId,
    });

    eventInput.organizationServiceId = organizationServiceId;
    return this.eventService.insertOne(eventInput);
  }

  @Mutation((returns) => Boolean)
  updateEvent(
    @Args({ name: 'eventInput', type: () => EventUpdateInput })
    eventInput: IEvent,
    @Args({ name: 'eventId', type: () => ID }) eventId: string,
  ): Promise<boolean> {
    return this.eventService.updateOneById(eventId, eventInput);
  }

  @Query((returns) => PaginatedEventResult)
  fetchEvents(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
    @Args({ name: 'organizationServiceId', type: () => ID })
    organizationServiceId: string,
  ): Promise<IPaginatedResult<IEvent>> {
    return this.eventService.findManyAndPaginate(
      {
        organizationServiceId: new ObjectId(organizationServiceId),
      },
      queryConfig,
    );
  }

  @Query((returns) => [Event])
  fetchAllEvents(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
    @Args({ name: 'organizationServiceId', type: () => ID })
    organizationServiceId: string,
  ): Promise<IEvent[]> {
    return this.eventService.findMany(
      {
        organizationServiceId: new ObjectId(organizationServiceId),
      },
      queryConfig,
    );
  }

  @Query((returns) => Event)
  fetchEvent(
    @Args({ name: 'eventId', type: () => ID }) eventId: string,
  ): Promise<IEvent> {
    let _id: any = eventId;
    return this.eventService.findOneOrFail({ _id });
  }

  @Mutation((returns) => Boolean)
  deleteEvent(
    @Args({ name: 'eventId', type: () => ID }) eventId: string,
  ): Promise<boolean> {
    let _id: any = eventId;
    return this.eventService.deleteOne({ _id });
  }

  @Mutation((returns) => Boolean)
  activateEvent(
    @Args({ name: 'eventId', type: () => ID }) eventId: string,
  ): Promise<boolean> {
    let _id: any = eventId;
    return this.eventService.updateOne(
      { _id },
      { activated: true, activatedAt: new Date() },
    );
  }

  @Mutation((returns) => Boolean)
  deactivateEvent(
    @Args({ name: 'eventId', type: () => ID }) eventId: string,
  ): Promise<boolean> {
    let _id: any = eventId;
    return this.eventService.updateOne({ _id }, { activated: false });
  }
}

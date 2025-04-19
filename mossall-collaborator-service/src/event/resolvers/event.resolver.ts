import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { Event, PaginatedEventResult } from '../dto/event.entity';
import { IEvent } from '../schemas/interfaces/event.interface';
import { EventService } from '../services/event.service';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';
import { ObjectId } from 'bson';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
@UseGuards(AuthGuard)
@Resolver()
export class EventResolver {
  constructor(private eventService: EventService) {}

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
    @CurrentUser() currentUser: any,
  ): Promise<IEvent[]> {
    console.log('currentUser', currentUser);

    return this.eventService.findMany(
      {
        organizationServiceId: new ObjectId(organizationServiceId),
        activated: true,
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
}

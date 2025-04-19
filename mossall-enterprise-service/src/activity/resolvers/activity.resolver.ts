import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { AuthGuard } from '~/auth/auth.guard';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { IPagination } from '~/commons/graphql/pagination';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { CurrentOrganization } from '~/organization/decorators/current-organization.decorator';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { Activity, PaginatedActivityResult } from '../dto/activity.entity';
import { ActivityInput } from '../dto/activity.input';
import { ActivityUpdateInput } from '../dto/activity.update.input';
import { IActivity } from '../schemas/interfaces/activity.interface';
import { Activitieservice } from '../services/activity.service';

@UseGuards(AuthGuard)
@Resolver()
export class ActivityResolver {
  constructor(private activitieservice: Activitieservice) {}

  @Query(returns => PaginatedActivityResult)
  fetchPaginatedActivities(
    @Args({ name: "queryFilter", type: () => QueryDataConfigInput, nullable: true }) queryDataConfig: QueryDataConfigInput,
    @CurrentUser() user: IUser
  ): Promise<IPagination<IActivity>> {
    return this.activitieservice.findManyAndPaginate({ organization: user.organization }, queryDataConfig);
  }

  @Query(returns => Activity)
  fetchActivity(
    @Args({ name: 'activityId', type: () => ID }) activityId: string,
  ): Promise<IActivity> {
    return this.activitieservice.findOneByIdOrFail(activityId);
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Activity } from '../dto/activity.entity';
import { ActivityInput } from '../dto/activity.input';
import { ActivityUpdateInput } from '../dto/activity.update.input';
import { IActivity } from '../schemas/interfaces/activity.interface';
import { Activitieservice } from '../services/activity.service';

@Resolver()
export class ActivityResolver {
  constructor(private activitieservice: Activitieservice) {}

  @Mutation(returns => Activity)
  createActivity(
    @Args({ name: 'activityInput', type: () => ActivityInput })
    activityInput: IActivity,
  ): Promise<IActivity> {
    return this.activitieservice.insertOne(activityInput);
  }

  @Mutation(returns => Boolean)
  updateActivity(
    @Args({ name: 'activityInput', type: () => ActivityUpdateInput })
    activityInput: IActivity,
    @Args({ name: 'activityId', type: () => ID }) activityId: string,
  ): Promise<boolean> {
    return this.activitieservice.updateOneById(activityId, activityInput);
  }

  @Query(returns => [Activity])
  fetchActivities(): Promise<IActivity[]> {
    return this.activitieservice.findMany({});
  }

  @Query(returns => Activity)
  fetchActivity(
    @Args({ name: 'activityId', type: () => ID }) activityId: string,
  ): Promise<IActivity> {
    return this.activitieservice.findOneByIdOrFail(activityId);
  }
}

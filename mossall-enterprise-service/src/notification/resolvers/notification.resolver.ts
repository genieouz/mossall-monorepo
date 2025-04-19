import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import {
  Notification,
  PaginatedNotificationResult,
} from '../dto/notification.entity';
import { NotificationService } from '../services/notification.service';
import { AuthGuard } from '~/auth/auth.guard';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { DemandesMetricsInput } from '~/demande/dto/demandes-metrics.input';

@UseGuards(AuthGuard)
@Resolver()
export class NotificationResolver {
  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
  ) {}

  @Query((returns) => [Notification])
  async fetchOrganizationNotifications(@CurrentUser() user: IUser) {
    // const admin = await this.userService.findOne({ email: user.email });
    return this.notificationService.aggregateMany([
      {
        $match: { organization: user.organization },
      },
      {
        $set: {
          viewedByMe: {
            $cond: [{ $in: [user._id, '$viewedBy'] }, true, false],
          },
        },
      },
      { $sort: { viewedByMe: -1, createdAt: -1 } },
    ]);
  }

  @Mutation((returns) => Boolean)
  async viewOrganizationNotifications(@CurrentUser() user: IUser) {
    // const admin = await this.userService.findOne({ email: user.email });
    return this.notificationService.addToSetByFilter(
      { organization: user.organization },
      'viewedBy',
      user._id,
    );
  }

  @Query((returns) => PaginatedNotificationResult)
  fetchPaginatedNotifications(
    @CurrentUser() user: IUser,
    @Args({
      name: 'queryFilter',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryDataConfig: QueryDataConfigInput,
    @Args({
      name: 'metricsInput',
      type: () => DemandesMetricsInput,
      nullable: true,
    })
    metricsInput: DemandesMetricsInput = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2030-12-31'),
    },
  ) {
    let endDate = new Date(metricsInput.endDate);
    endDate.setDate(endDate.getDate() + 1);
    return this.notificationService.findManyNotificationsAndPaginate(
      user,
      queryDataConfig,
    );
  }
}

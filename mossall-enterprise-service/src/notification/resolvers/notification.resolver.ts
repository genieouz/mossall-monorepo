import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { Notification } from '../dto/notification.entity';
import { NotificationService } from '../services/notification.service';
import { AuthGuard } from '~/auth/auth.guard';

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
}

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { INotification } from '../schemas/interfaces/notification.interface';
import { NotificationService } from '../services/notification.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Notification } from '../dto/notification.entity';
@ApiTags('notifications')
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}
  @ApiOperation({ summary: 'Create a notification' })
  @ApiResponse({
    status: 201,
    description: 'The notifications has been successfully created.',
    type: Notification,
  })
  @Public()
  @Post()
  async createNotification(
    @Body() notificationInput: INotification,
  ): Promise<INotification> {
    return this.notificationService.create(notificationInput);
  }
  @ApiOperation({ summary: 'get multi notifications' })
  @ApiResponse({
    status: 200,
    description: 'get notifications',
    type: [Notification],
  })
  @Get()
  fetchNotifications(): Promise<INotification[]> {
    return this.notificationService.findMany({});
  }
}

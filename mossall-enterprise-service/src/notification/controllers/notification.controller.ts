import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { INotification } from '../schemas/interfaces/notification.interface';
import { NotificationService } from '../services/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Public()
  @Post()
  async createNotification(
    @Body() notificationInput: INotification,
  ): Promise<INotification> {
    return this.notificationService.create(notificationInput);
  }

  @Get()
  fetchNotifications(): Promise<INotification[]> {
    return this.notificationService.findMany({});
  }
}

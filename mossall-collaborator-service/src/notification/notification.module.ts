import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [
    HttpModule
  ],
  providers: [
    NotificationService,
  ],
  exports: [NotificationService]
})
export class NotificationModule {}

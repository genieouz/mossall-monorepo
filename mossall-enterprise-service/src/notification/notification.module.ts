import { forwardRef, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '~/auth/auth.module';
import { UserModule } from '~/users/user.module';
import { NotificationController } from './controllers/notification.controller';
import { NotificationResolver } from './resolvers/notification.resolver';
import {
    notificationModelName,
} from './schemas/notification.model-name';
import { notificationSchema } from './schemas/notification.schema';
import { NotificationGateway } from './services/notification.gateway';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: notificationSchema, name: notificationModelName },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    EventEmitterModule.forRoot()
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationResolver,
    NotificationGateway
  ],
  exports: [NotificationService]
})
export class NotificationModule {}

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventResolver } from './resolvers/event.resolver';
import { eventModelName } from './schemas/event.model-name';
import { eventSchema } from './schemas/event.schema';
import { EventService } from './services/event.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from '~/auth/auth.module';
import { UserModule } from '~/users/user.module';
import { EventPropertyResolver } from './resolvers/event-property.resolver';
import { OrganisationServiceModule } from '~/organisation-service/organisation-service.module';
import { ServiceModule } from '~/service/service.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: eventSchema, name: eventModelName }]),
    EventEmitterModule.forRoot(),
    forwardRef(() => OrganisationServiceModule),
    forwardRef(() => ServiceModule),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  providers: [EventService, EventResolver, EventPropertyResolver],
  exports: [EventService],
})
export class EventModule {}

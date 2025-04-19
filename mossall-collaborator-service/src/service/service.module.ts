import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicePropertyResolver } from './resolvers/service-property.resolver';
import { ServiceResolver } from './resolvers/service.resolver';
import { serviceModelName } from './schemas/service.model-name';
import { serviceSchema } from './schemas/service.schema';
import { ServiceService } from './services/service.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from '~/auth/auth.module';
import { UserModule } from '~/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: serviceSchema, name: serviceModelName },
    ]),
    EventEmitterModule.forRoot(),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [ServiceService, ServiceResolver, ServicePropertyResolver],
  exports: [ServiceService],
})
export class ServiceModule {}

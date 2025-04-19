import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '~/auth/auth.module';
import { OrganizationService } from './services/organization.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from '~/email/email.module';
import { UserModule } from '~/users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { organizationSchema } from './schemas/organization.schema';
import { organizationModelName } from './schemas/organization.model-name';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: organizationSchema, name: organizationModelName },
    ]),
    AuthModule,
    EventEmitterModule.forRoot(),
    EmailModule,
    forwardRef(() => UserModule),
  ],
  providers: [
    OrganizationService,
  ],
  exports: [OrganizationService]
})
export class OrganizationModule {}

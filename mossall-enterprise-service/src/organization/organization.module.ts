import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '~/auth/auth.module';
import { OrganizationResolver } from './resolvers/organization.resolver';
import { organizationModelName } from './schemas/organization.model-name';
import { organizationSchema } from './schemas/organization.schema';
import { OrganizationService } from './services/organization.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from '~/email/email.module';
import { UserModule } from '~/users/user.module';
import { OrganizationController } from './organization.controller';
import { CollaboratorsModule } from '~/collaborators/collaborators.module';
import { CacheModule } from '@nestjs/cache-manager';
import { OrganizationPropertyResolver } from './resolvers/organisation-property.resolver';
import { OrganisationServiceModule } from '~/organisation-service/organisation-service.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: organizationSchema, name: organizationModelName },
    ]),
    forwardRef(() => AuthModule),
    EventEmitterModule.forRoot(),
    EmailModule,
    forwardRef(() => UserModule),
    forwardRef(() => CollaboratorsModule),
    forwardRef(() => OrganisationServiceModule),
    // CacheModule.register({
    //   ttl: 5, // seconds
    // })
  ],
  providers: [
    OrganizationService,
    OrganizationResolver,
    OrganizationPropertyResolver,
  ],
  controllers: [OrganizationController],
  exports: [OrganizationService],
})
export class OrganizationModule {}

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganisationServiceResolver } from './resolvers/organisation-service.resolver';
import { organisationServiceModelName } from './schemas/organisation-service.model-name';
import { organisationServiceSchema } from './schemas/organisation-service.schema';
import { OrganisationServiceService } from './services/organisation-service.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from '~/auth/auth.module';
import { UserModule } from '~/users/user.module';
import { OrganizationServicePropertyResolver } from './resolvers/organisation-service-property.resolver';
import { OrganizationModule } from '~/organization/organization.module';
import { EventModule } from '~/event/event.module';
import { ServiceModule } from '~/service/service.module';
import { CategorySocioproModule } from '~/category-sociopro/category-sociopro.module';
import { DemandeModule } from '~/demande/demande.module';
import { CategorySocioproServiceModule } from '~/category-sociopro-service/category-sociopro-service.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: organisationServiceSchema, name: organisationServiceModelName },
    ]),
    EventEmitterModule.forRoot(),
    forwardRef(() => OrganizationModule),
    forwardRef(() => EventModule),
    forwardRef(() => ServiceModule),
    forwardRef(() => CategorySocioproModule),
    forwardRef(() => CategorySocioproServiceModule),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => DemandeModule),
  ],
  providers: [
    OrganisationServiceService,
    OrganisationServiceResolver,
    OrganizationServicePropertyResolver,
  ],
  exports: [OrganisationServiceService],
})
export class OrganisationServiceModule {}

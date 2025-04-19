import { forwardRef, Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AuthModule } from '~/auth/auth.module';
import { NotificationModule } from '~/notification/notification.module';
import { OrganizationModule } from '~/organization/organization.module';
import { PaymentModule } from '~/payment/payment.module';
import { UserModule } from '~/users/user.module';
import { DemandePropertyResolver } from './resolvers/demande-property.resolver';
import { DemandeResolver } from './resolvers/demande.resolver';
import { demandeModelName } from './schemas/demande.model-name';
import { demandeSchema } from './schemas/demande.schema';
import { DemandeEventsService } from './services/demande-events.service';
import { DemandeService } from './services/demande.service';
import { DemandeController } from './controllers/demande/demande.controller';
import { DemandeFileService } from './services/demande-file.service';
import { OrganisationServiceModule } from '~/organisation-service/organisation-service.module';
import { RemboursementModule } from '~/remboursement/remboursement.module';
import { ServiceModule } from '~/service/service.module';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   { schema: demandeSchema, name: demandeModelName },
    // ]),
    MongooseModule.forFeatureAsync([
      {
        name: demandeModelName,
        useFactory: async (connection: Connection) => {
          const schema = demandeSchema;
          const AutoIncrement = require('mongoose-sequence')(connection);
          schema.plugin(AutoIncrement, { inc_field: 'number' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => NotificationModule),
    forwardRef(() => PaymentModule),
    forwardRef(() => OrganizationModule),
    forwardRef(() => OrganisationServiceModule),
    forwardRef(() => RemboursementModule),
    forwardRef(() => ServiceModule),
  ],
  providers: [
    DemandeService,
    DemandeEventsService,
    DemandeResolver,
    DemandePropertyResolver,
    DemandeFileService,
  ],
  exports: [DemandeService],
  controllers: [DemandeController],
})
export class DemandeModule {}

import { forwardRef, Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AuthModule } from '~/auth/auth.module';
import { NotificationModule } from '~/notification/notification.module';
import { OrganizationModule } from '~/organization/organization.module';
import { UserModule } from '~/users/user.module';
import { DemandeController } from './demande.controller';
import { DemandeResolver } from './resolvers/demande.resolver';
import {
    demandeModelName,
} from './schemas/demande.model-name';
import { demandeSchema } from './schemas/demande.schema';
import { DemandeEventsService } from './services/demande-events.service';
import { DemandeService } from './services/demande.service';

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
          schema.plugin(AutoIncrement, {inc_field: 'number'});
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    AuthModule,
    forwardRef(() => UserModule),
    forwardRef(() => OrganizationModule),
    NotificationModule
  ],
  controllers: [DemandeController],
  providers: [
    DemandeService,
    DemandeEventsService,
    DemandeResolver,
  ],
  exports: [DemandeService]
})
export class DemandeModule {}


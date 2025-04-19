import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '~/auth/auth.module';
import { DemandeModule } from '~/demande/demande.module';
import { OrganizationModule } from '~/organization/organization.module';
import { PaymentModule } from '~/payment/payment.module';
import { UserModule } from '~/users/user.module';
import { ActivityPropertyResolver } from './resolvers/activity-property.resolver';
import { ActivityResolver } from './resolvers/activity.resolver';
import {
    activityModelName,
} from './schemas/activity.model-name';
import { activitieschema } from './schemas/activity.schema';
import { Activitieservice } from './services/activity.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: activitieschema, name: activityModelName },
    ]),
    OrganizationModule,
    PaymentModule,
    DemandeModule,
    UserModule,
    AuthModule
  ],
  providers: [
    Activitieservice,
    ActivityResolver,
    ActivityPropertyResolver
  ],
})
export class ActivityModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DemandeModule } from '~/demande/demande.module';
import { OrganizationModule } from '~/organization/organization.module';
import { PaymentModule } from '~/payment/payment.module';
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
    DemandeModule
  ],
  providers: [
    Activitieservice,
    ActivityResolver,
  ],
})
export class ActivityModule {}

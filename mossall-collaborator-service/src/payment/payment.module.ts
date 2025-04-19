import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '~/auth/auth.module';
import { CollaboratorsModule } from '~/collaborators/collaborators.module';
import { DemandeModule } from '~/demande/demande.module';
import { UserModule } from '~/users/user.module';
import { PaymentResolver } from './resolvers/payment.resolver';
import {
    paymentModelName,
} from './schemas/payment.model-name';
import { paymentSchema } from './schemas/payment.schema';
import { PaymentService } from './services/payment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: paymentSchema, name: paymentModelName },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => DemandeModule),
    HttpModule,
    // EventEmitterModule.forRoot()
  ],
  controllers: [],
  providers: [
    PaymentService,
    PaymentResolver,
  ],
  exports: [PaymentService]
})
export class PaymentModule {}

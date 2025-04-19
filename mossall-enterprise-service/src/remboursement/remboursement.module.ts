import { forwardRef, Module } from '@nestjs/common';
import { RemboursementService } from './services/remboursement.service';
import { MongooseModule } from '@nestjs/mongoose';
import { remboursementModelName } from './schemas/remboursement.model-name';
import { remboursementSchema } from './schemas/remboursement.schema';
import { RemboursementResolver } from './resolvers/remboursement.resolver';
import { AuthModule } from '~/auth/auth.module';
import { UserModule } from '~/users/user.module';
import { DemandeModule } from '~/demande/demande.module';
import { RemboursementPropertyResolver } from './resolvers/remboursement-property.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: remboursementSchema, name: remboursementModelName },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => DemandeModule),
  ],
  providers: [
    RemboursementService,
    RemboursementResolver,
    RemboursementPropertyResolver,
  ],
  exports: [RemboursementService],
})
export class RemboursementModule {}

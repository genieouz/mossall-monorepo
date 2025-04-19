import { CollaboratorsService } from './collaborators.service';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '~/auth/auth.module';
import { UserModule } from '~/users/user.module';
import { HttpModule } from '@nestjs/axios';
import { CollaboratorsResolver } from './collaborators.resolver';
import { DemandeModule } from '~/demande/demande.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UserModule,
    HttpModule,
    DemandeModule
  ],
  controllers: [],
  providers: [CollaboratorsService, CollaboratorsResolver],
  exports: [CollaboratorsService]
})
export class CollaboratorsModule {}

import { CollaboratorsService } from './collaborators.service';
import { forwardRef, Module } from '@nestjs/common';
import { CollaboratorResolver } from './resolvers/collaborators.resolver';
import { AuthModule } from '~/auth/auth.module';
import { UserModule } from '~/users/user.module';
import { HttpModule } from '@nestjs/axios';
import { DemandePropertyResolver } from '../demande/resolvers/demande-property.resolver';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    HttpModule
  ],
  controllers: [],
  providers: [CollaboratorsService, CollaboratorResolver],
  exports: [CollaboratorsService]
})
export class CollaboratorsModule {}

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '~/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { DemandeModule } from '~/demande/demande.module';
import { UserPropertyResolver } from './resolvers/user-property.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { userModelName } from './schemas/user.model-name';
import { OrganizationModule } from '~/organization/organization.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: userSchema, name: userModelName }]),
    AuthModule,
    HttpModule,
    forwardRef(() => DemandeModule),
    forwardRef(() => OrganizationModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserPropertyResolver, UserResolver],
  exports: [UserService, UserPropertyResolver, UserResolver],
})
export class UserModule {}

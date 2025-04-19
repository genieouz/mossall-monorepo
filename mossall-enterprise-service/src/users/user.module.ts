import { UserService } from './user.service';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '~/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { UserPropertyResolver } from './resolvers/user-property.resolver';
import { OrganizationModule } from '~/organization/organization.module';
import { UserResolver } from './resolvers/user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { userModelName } from './schemas/user.model-name';
import { DemandeModule } from '~/demande/demande.module';
import { UsersController } from './controllers/users/users.controller';
import { FileUploadService } from './file.upload.service';
import { CategorySocioproModule } from '~/category-sociopro/category-sociopro.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: userSchema, name: userModelName }]),
    forwardRef(() => AuthModule),
    HttpModule,
    forwardRef(() => OrganizationModule),
    forwardRef(() => DemandeModule),
    CategorySocioproModule,
  ],
  controllers: [UsersController],
  providers: [
    UserService,
    FileUploadService,
    UserPropertyResolver,
    UserResolver,
  ],
  exports: [UserService],
})
export class UserModule {}

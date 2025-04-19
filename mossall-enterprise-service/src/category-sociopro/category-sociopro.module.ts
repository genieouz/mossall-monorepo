import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySocioproPropertyResolver } from './resolvers/category-sociopro-property.resolver';
import { CategorySocioproResolver } from './resolvers/category-sociopro.resolver';
import { categorySocioproModelName } from './schemas/category-sociopro.model-name';
import { categorySocioproSchema } from './schemas/category-sociopro.schema';
import { CategorySocioproService } from './services/category-sociopro.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from '~/auth/auth.module';
import { UserModule } from '~/users/user.module';
import { OrganizationModule } from '~/organization/organization.module';
import { CategorySocioproServiceModule } from '~/category-sociopro-service/category-sociopro-service.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: categorySocioproSchema, name: categorySocioproModelName },
    ]),
    EventEmitterModule.forRoot(),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => OrganizationModule),
    forwardRef(() => CategorySocioproServiceModule),
  ],
  providers: [
    CategorySocioproService,
    CategorySocioproResolver,
    CategorySocioproPropertyResolver,
  ],
  exports: [CategorySocioproService],
})
export class CategorySocioproModule {}

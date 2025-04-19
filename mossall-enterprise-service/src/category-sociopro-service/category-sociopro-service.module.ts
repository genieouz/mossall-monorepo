import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySocioproServicePropertyResolver } from './resolvers/category-sociopro-service-property.resolver';
import { CategorySocioproServiceResolver } from './resolvers/category-sociopro-service.resolver';
import { categorySocioproServiceModelName } from './schemas/category-sociopro-service.model-name';
import { categorySocioproServiceSchema } from './schemas/category-sociopro-service.schema';
import { CategorySocioproServiceService } from './services/category-sociopro-service.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from '~/auth/auth.module';
import { UserModule } from '~/users/user.module';
import { CategorySocioproModule } from '~/category-sociopro/category-sociopro.module';
import { OrganisationServiceModule } from '~/organisation-service/organisation-service.module';
import { EventModule } from '~/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: categorySocioproServiceSchema,
        name: categorySocioproServiceModelName,
      },
    ]),
    EventEmitterModule.forRoot(),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CategorySocioproModule),
    forwardRef(() => OrganisationServiceModule),
    forwardRef(() => EventModule),
  ],
  providers: [
    CategorySocioproServiceService,
    CategorySocioproServiceResolver,
    CategorySocioproServicePropertyResolver,
  ],
  exports: [CategorySocioproServiceService],
})
export class CategorySocioproServiceModule {}

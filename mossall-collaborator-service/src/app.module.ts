import { UserModule } from './users/user.module';
import {
  ApolloDriver,
  ApolloDriverConfig,
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '~/app.controller';
import { AppService } from '~/app.service';
import { ENABLE_PLAYGROUND, IS_ONLINE, MONGODB_URL } from '~/config/env';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrganizationModule } from './organization/organization.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { DemandeModule } from './demande/demande.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    
    UserModule,
    MongooseModule.forRoot(MONGODB_URL),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: "schema.gql",
    //   playground: ENABLE_PLAYGROUND
    // }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      // autoSchemaFile: true,
      autoSchemaFile: { path: 'schema.gql', federation: 2 },
      introspection: true,
      playground: true
    }),
    AuthModule,
    EventEmitterModule.forRoot(),
    OrganizationModule,
    CollaboratorsModule,
    DemandeModule,
    ActivityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

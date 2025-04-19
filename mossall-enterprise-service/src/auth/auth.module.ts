import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { HttpModule } from '@nestjs/axios';
import { AuthGuard, KeycloakConnectModule, PolicyEnforcementMode, ResourceGuard, RoleGuard, TokenValidation } from 'nest-keycloak-connect'; 
import { KeycloakConfigService } from './keycloack/keycloak-config.service';
import { SessionPropertyResolver } from './session-property.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { tokenAcknowledgmentSchema } from './schemas/token-acknowledgment.schema';
import { tokenAcknowledgmentModelName } from './schemas/token-acknowledgment.model-name';
import { TokenAcknowledgmentService } from './services/token-acknowledgment.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from '~/email/email.module';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from '~/users/user.module';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useClass: KeycloakConfigService,
    }),
    MongooseModule.forFeature([
      { schema: tokenAcknowledgmentSchema, name: tokenAcknowledgmentModelName },
    ]),
    HttpModule,
    EventEmitterModule.forRoot(),
    EmailModule,
    forwardRef(() => UserModule)
  ],
  providers: [AuthService, AuthResolver, SessionPropertyResolver, TokenAcknowledgmentService],
  controllers: [AuthController],
  exports: [AuthService, KeycloakConnectModule]
})
export class AuthModule {}

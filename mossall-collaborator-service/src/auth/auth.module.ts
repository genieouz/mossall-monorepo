import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { HttpModule } from '@nestjs/axios';

import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from '~/email/email.module';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from '~/users/user.module';

@Module({
  imports: [
    HttpModule,
    EventEmitterModule.forRoot(),
    EmailModule,
    forwardRef(() => UserModule),
  ],
  providers: [
    AuthResolver,
    AuthService,
    // SessionPropertyResolver
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

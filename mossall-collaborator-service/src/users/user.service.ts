/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '~/auth/auth.service';
import { AbstractService } from '~/commons/abstract/abstract.service';
import {
  JWT_SECRET,
  KEYCLOAK_COLLABORATOR_REALM,
  USER_SERVICE_URL,
} from '~/config/env';
import { User } from './dto/user.entity';
import { IUser } from './schemas/interfaces/user.interface';
import { userModelName } from './schemas/user.model-name';
import { LoginInput } from '~/auth/dto/login.input';
import * as jwt from 'jsonwebtoken';

import * as bcrypt from 'bcrypt';
import { resetPasswordTokenDuration } from '~/auth/constant';

@Injectable()
export class UserService extends AbstractService<IUser> {
  constructor(
    @InjectModel(userModelName) model: Model<IUser>,
    private httpService: HttpService,
  ) {
    super(model);
  }

  findById(_id: string): Promise<IUser> {
    return this.findOne({ _id });
  }

  async createAdmin(payload: User, password: string) {}

  async createCollaborator(payload: User, password: string) {}

  async createUser(payload: User) {}
}

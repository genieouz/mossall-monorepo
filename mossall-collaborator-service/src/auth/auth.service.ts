import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { UserService } from '~/users/user.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { accessTokenDuration, resetPasswordTokenDuration } from './constant';
import { JWT_SECRET } from '~/config/env';
import { ResetPasswordInput } from './dto/reset-password.input';
import { Session } from './dto/session.type';
import { generatePassword } from '~/commons/utils';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRole } from '~/users/enums/user-role.enum';

@Injectable()
export class AuthService {
  #logger: Logger;

  constructor(
    private userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {
    this.#logger = new Logger(`🛡️🛡️${AuthService.name}🛡️🛡️🛡️`);
  }

  async loginJWT(payload: LoginInput) {
    this.#logger.log('Login user with payload ' + JSON.stringify(payload));
    let user = await this.userService.findOne({
      email: payload.email.split(' ').join(''),
      blocked: { $ne: true },
    });
    if (!user || user.role !== UserRole.COLLABORATOR) {
      this.#logger.log('user not found');
      this.#logger.log(user);
      throw new UnauthorizedException();
    }
    this.#logger.log('user found ' + user.email);
    if (!bcrypt.compareSync(payload.password, user.password)) {
      this.#logger.log('user password not matching');
      throw new UnauthorizedException();
    }
    delete user.password;
    this.#logger.log('user password checked');
    const encryptedData = {
      user: {
        _id: user._id,
        email: user.email,
      },
    };
    // Vérifier si l'utilisateur n'est pas entièrement configuré
    if (!user?.enabled) {
      this.#logger.log('user not enabled');
      const token = jwt.sign(encryptedData, JWT_SECRET, {
        expiresIn: resetPasswordTokenDuration,
      });
      return { enabled: false, user: null, token };
    }
    this.#logger.log('user enabled');
    // Générer le jeton JWT d'accès

    const accessToken = jwt.sign(encryptedData, JWT_SECRET, {
      expiresIn: accessTokenDuration,
    });
    console.log(
      JSON.stringify(await this.decodeToken(accessToken, JWT_SECRET)),
    );

    this.#logger.log('user access token generated');
    // Générer le jeton JWT de rafraîchissement
    const refreshToken = jwt.sign(encryptedData, JWT_SECRET, {
      expiresIn: resetPasswordTokenDuration,
    });
    console.log(
      JSON.stringify(await this.decodeToken(refreshToken, JWT_SECRET)),
    );

    this.#logger.log('user refresh token generated');
    return {
      user,
      enabled: true,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: resetPasswordTokenDuration,
    };
  }

  async decodeToken(
    token: string,
    secret = JWT_SECRET,
  ): Promise<{ user: { _id: string; email: string } }> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, result) => {
        if (err) {
          resolve(null);
        } else {
          resolve(result);
        }
      });
    });
  }
  async refreshToken(token: string) {
    try {
      this.#logger.log('refreshing token with token ' + token);
      // Vérifier et décoder le jeton de rafraîchissement
      this.#logger.log('decode token with payload ' + token);
      const decoded = jwt.verify(token, JWT_SECRET) as {
        user: {
          _id: string;
          email: string;
        };
      };

      this.#logger.log(`info in token ${JSON.stringify(decoded)}`);

      if (!decoded) {
        throw new NotFoundException('Jeton invalide');
      }
      this.#logger.log('token decode success with token ' + token);

      const userOnDb = await this.userService.findOne({
        email: decoded.user.email,
      });

      if (!userOnDb) {
        throw new NotFoundException('Jeton invalide');
      }

      this.#logger.log('user found ' + userOnDb.email);
      // Générer un nouveau jeton JWT d'accès
      const newAccessToken = jwt.sign(
        { user: { _id: userOnDb._id, email: userOnDb.email } },
        JWT_SECRET,
        {
          expiresIn: accessTokenDuration,
        },
      );

      this.#logger.log('user access token generated');
      // Générer un nouveau jeton JWT de rafraîchissement
      const newRefreshToken = jwt.sign(
        { user: { _id: userOnDb._id, email: userOnDb.email } },
        JWT_SECRET,
        {
          expiresIn: resetPasswordTokenDuration,
        },
      );

      this.#logger.log('user refresh token generated');
      // Retourner les nouveaux jetons
      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: resetPasswordTokenDuration,
      };
    } catch (error) {
      this.#logger.error(error);
      throw new NotFoundException('Jeton de rafraîchissement invalide');
    }
  }

  async startForgotPassword(email: string) {
    this.#logger.log('startForgotPassword with email ' + email);

    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    this.#logger.log('user found ' + user.email);
    const password = generatePassword();
    this.#logger.log('password generated ' + password);
    await this.userService.updateOneById(user._id, {
      password: bcrypt.hashSync(password, 10),
      enabled: false,
    });
    this.#logger.log('user updated ' + user.email);
    this.eventEmitter.emit('startforgotpassword', { email, password });
    return true;
  }

  async requestResetPassword(payload: LoginInput) {
    const user = await this.userService.findOneOrFail({ email: payload.email });
    const same = bcrypt.compareSync(payload.password, user.password);
    if (!same) {
      throw new ForbiddenException('Mot de passe incorrecte');
    }
    delete payload.password;
    const token = jwt.sign({ user: payload }, JWT_SECRET, {
      expiresIn: resetPasswordTokenDuration,
    });
    return token;
  }

  async resetPassword(resetInput: ResetPasswordInput) {
    this.#logger.log(
      'resetPassword with payload ' + JSON.stringify(resetInput),
    );

    const tempUser = await this.decodeToken(resetInput.token, JWT_SECRET);
    this.#logger.log(`info in token ${JSON.stringify(tempUser)}`);
    if (!tempUser || !tempUser.user) {
      this.#logger.log('token decode failed with token ' + resetInput.token);
      throw new BadRequestException(`Token invalide`);
    }
    this.#logger.log('token decode success with token ' + resetInput.token);
    const user = await this.userService.findOne({
      email: tempUser.user?.email,
    });
    if (!user) {
      this.#logger.log('user not found with token ' + resetInput.token);
      throw new BadRequestException(`Cet utilisateur n'existe pas`);
    }

    this.#logger.log('user found with token ' + user);
    user.password = bcrypt.hashSync(resetInput.password, 10);
    user.enabled = true;
    this.#logger.log('user updating with token ' + user.email);
    return this.userService.updateOneById(user._id, user);
  }
}

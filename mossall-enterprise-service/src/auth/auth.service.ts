import { HttpService } from '@nestjs/axios';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import * as https from 'https';
import { LoginInput } from './dto/login.input';
import { JWT_SECRET } from '~/config/env';
import * as jwt from 'jsonwebtoken';
import { accessTokenDuration, resetPasswordTokenDuration } from './constant';
import { ResetPasswordInput } from './dto/reset-password.input';
import { TokenAcknowledgmentService } from './services/token-acknowledgment.service';
import { generatePassword } from '~/commons/utils';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FinalizeForgotPasswordInput } from './dto/finalize-forgot-password.input';
import { UserService } from '~/users/user.service';
import { UserRole } from '~/users/enums/user-role.enum';

@Injectable()
export class AuthService {
  #logger: Logger;

  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private tokenAcknowledgmentService: TokenAcknowledgmentService,
    private eventEmitter: EventEmitter2,
  ) {
    this.httpService.axiosRef.defaults.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    this.#logger = new Logger(`🛡️🛡️${AuthService.name}🛡️🛡️🛡️`);
  }

  async requestResetPassword(payload: LoginInput) {
    this.#logger.log(
      'requestResetPassword with payload ' + JSON.stringify(payload),
    );
    const user = await this.userService.findOneOrFail({ email: payload.email });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouve');
    }
    this.#logger.log('user found ' + user.email);
    const same = bcrypt.compareSync(payload.password, user.password);
    if (!same) {
      throw new ForbiddenException('Mot de passe incorrecte');
    }

    this.#logger.log('user password checked');
    const token = jwt.sign(
      { user: { _id: user._id, email: user.email } },
      JWT_SECRET,
      {
        expiresIn: resetPasswordTokenDuration,
      },
    );

    this.#logger.log('token generated ' + token);
    return token;
  }
  async refreshToken(token: string) {
    try {
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

    const user = await this.userService.findOneOrFail({ email });
    this.#logger.log('user found ' + user.email);
    const password = generatePassword();

    this.#logger.log('password generated ' + password);
    await this.userService.updateOne(
      { email },
      { password: this.hashPassword(password), enabled: false },
    );

    this.#logger.log('user updated ' + user.email);
    this.eventEmitter.emit('startforgotpassword', { email, password });
    this.#logger.log('event emitted ' + user.email);
    return true;
  }

  async finalizeForgotPassword(payload: FinalizeForgotPasswordInput) {
    // try {
    //   const data = await this.decodeToken(payload.token, JWT_SECRET);
    //   await this.tokenAcknowledgmentService.findOneOrFail({
    //     email: data.email,
    //     token: payload.token,
    //     code: payload.code,
    //   });
    //   await this.tokenAcknowledgmentService.deleteMany({ email: data.email });
    //   await this.resetPassword(payload, KEYCLOAK_COLLABORATOR_REALM);
    //   this.eventEmitter.emit('finalizeforgotpassword', { email: data.email });
    //   return true;
    // } catch (error) {
    //   console.warn(error);
    //   throw new ForbiddenException('Token invalide');
    // }
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
      email: tempUser?.user?.email,
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

  async decodeToken(
    token: string,
    secret = JWT_SECRET,
  ): Promise<{ user: { _id: string; email: string } } | null> {
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

  async loginJWT(payload: LoginInput) {
    this.#logger.log('checking user with payload ' + JSON.stringify(payload));
    let user = await this.userService.findOne({
      email: payload.email.split(' ').join(''),
      blocked: { $ne: true },
    });
    if (!user || user.role === UserRole.COLLABORATOR) {
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
    // Vérifier si l'utilisateur n'est pas entièrement configuré
    const dataToEncrypt = {
      user: {
        _id: user._id,
        email: user.email,
      },
    };
    if (!user?.enabled) {
      this.#logger.log('user not enabled');
      const token = jwt.sign(dataToEncrypt, JWT_SECRET, {
        expiresIn: resetPasswordTokenDuration,
      });
      return { enabled: false, user: null, token };
    }

    this.#logger.log('user enabled');
    // Générer le jeton JWT d'accès

    const accessToken = jwt.sign(dataToEncrypt, JWT_SECRET, {
      expiresIn: accessTokenDuration,
    });

    this.#logger.log('user access token generated');
    // Générer le jeton JWT de rafraîchissement
    const refreshToken = jwt.sign(dataToEncrypt, JWT_SECRET, {
      expiresIn: resetPasswordTokenDuration,
    });

    this.#logger.log('user refresh token generated');
    return {
      user,
      enabled: true,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: resetPasswordTokenDuration,
    };
  }

  hashPassword(plaintextPassword: string): string {
    return bcrypt.hashSync(plaintextPassword, 10);
  }
}

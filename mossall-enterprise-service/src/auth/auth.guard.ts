import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { getRequestFromContext } from '~/commons/utils';
import { AuthService } from './auth.service';
import { request, Request } from 'express';
import { COLLABORATOR_SERVICE_USED_KEY, JWT_SECRET } from '~/config/env';
import * as jwt from 'jsonwebtoken';
import { UserService } from '~/users/user.service';
import { Reflector } from '@nestjs/core';
import { IS_COLLAB_API } from './decorators/collab-api.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isCollabApi = this.reflector.getAllAndOverride<boolean>(
      IS_COLLAB_API,
      [context.getHandler(), context.getClass()],
    );

    const request = getRequestFromContext(context);
    const apiKey = request.headers['x-api-key'];

    console.log('Start use api key', apiKey);
    console.log({ apiKey, COLLABORATOR_SERVICE_USED_KEY });

    if (
      apiKey &&
      COLLABORATOR_SERVICE_USED_KEY &&
      apiKey == COLLABORATOR_SERVICE_USED_KEY
    )
      return true;

    console.log('Key not valid or variable not set');

    if (isCollabApi) return true;

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.authService.decodeToken(token, JWT_SECRET);
      if (!payload || !payload.user) {
        throw new UnauthorizedException();
      }
      const data = await this.userService.findOne({
        email: payload.user.email,
        blocked: { $ne: true },
      });
      console.log('Data', data);

      if (!data) {
        throw new UnauthorizedException();
      }
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = data;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

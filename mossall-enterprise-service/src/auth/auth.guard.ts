import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { getRequestFromContext } from '~/commons/utils';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JWT_SECRET } from '~/config/env';
import * as jwt from 'jsonwebtoken';
import { UserService } from '~/users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    const request = getRequestFromContext(context);
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

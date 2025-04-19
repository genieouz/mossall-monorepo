import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '~/users/user.service';
export declare class AuthGuard implements CanActivate {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}

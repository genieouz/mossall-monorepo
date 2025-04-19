import { LoginInput } from './dto/login.input';
import { UserService } from '~/users/user.service';
import { ResetPasswordInput } from './dto/reset-password.input';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class AuthService {
    #private;
    private userService;
    private eventEmitter;
    constructor(userService: UserService, eventEmitter: EventEmitter2);
    loginJWT(payload: LoginInput): Promise<{
        enabled: boolean;
        user: any;
        token: any;
        access_token?: undefined;
        refresh_token?: undefined;
        expires_in?: undefined;
    } | {
        user: import("../users/schemas/interfaces/user.interface").IUser & {
            _id: import("mongoose").Types.ObjectId;
        };
        enabled: boolean;
        access_token: any;
        refresh_token: any;
        expires_in: number;
        token?: undefined;
    }>;
    decodeToken(token: string, secret?: string): Promise<{
        user: {
            _id: string;
            email: string;
        };
    }>;
    refreshToken(token: string): Promise<{
        access_token: any;
        refresh_token: any;
        expires_in: number;
    }>;
    startForgotPassword(email: string): Promise<boolean>;
    requestResetPassword(payload: LoginInput): Promise<any>;
    resetPassword(resetInput: ResetPasswordInput): Promise<boolean>;
}

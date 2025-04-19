import { HttpService } from '@nestjs/axios';
import { LoginInput } from './dto/login.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { TokenAcknowledgmentService } from './services/token-acknowledgment.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FinalizeForgotPasswordInput } from './dto/finalize-forgot-password.input';
import { UserService } from '~/users/user.service';
export declare class AuthService {
    #private;
    private httpService;
    private userService;
    private tokenAcknowledgmentService;
    private eventEmitter;
    constructor(httpService: HttpService, userService: UserService, tokenAcknowledgmentService: TokenAcknowledgmentService, eventEmitter: EventEmitter2);
    requestResetPassword(payload: LoginInput): Promise<any>;
    refreshToken(token: string): Promise<{
        access_token: any;
        refresh_token: any;
        expires_in: number;
    }>;
    startForgotPassword(email: string): Promise<boolean>;
    finalizeForgotPassword(payload: FinalizeForgotPasswordInput): Promise<void>;
    resetPassword(resetInput: ResetPasswordInput): Promise<boolean>;
    decodeToken(token: string, secret?: string): Promise<{
        user: {
            _id: string;
            email: string;
        };
    } | null>;
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
    hashPassword(plaintextPassword: string): string;
}

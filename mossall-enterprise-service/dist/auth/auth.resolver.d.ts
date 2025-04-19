import { AuthService } from './auth.service';
import { FinalizeForgotPasswordInput } from './dto/finalize-forgot-password.input';
import { LoginInput } from './dto/login.input';
import { ResetPasswordInput } from './dto/reset-password.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    loginAdmin(loginInput: LoginInput): Promise<{
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
    resetAdminPassword(resetPassword: ResetPasswordInput): Promise<boolean>;
    startForgotPassword(email: string): Promise<boolean>;
    finalizeForgotPassword(payload: FinalizeForgotPasswordInput): Promise<boolean>;
}

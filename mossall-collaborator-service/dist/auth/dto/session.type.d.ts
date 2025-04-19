import { IUser } from '~/users/schemas/interfaces/user.interface';
export declare class Session {
    user: IUser;
    token: string;
    enabled: boolean;
    expires_in?: number;
    refresh_token?: string;
    access_token?: string;
}

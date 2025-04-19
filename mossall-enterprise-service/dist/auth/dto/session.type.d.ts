import { IUser } from "~/users/schemas/interfaces/user.interface";
import { KeycloackAuthResult } from "./keycloak-auth-result";
export declare class Session extends KeycloackAuthResult {
    user: IUser;
    token: string;
    enabled: boolean;
}

import { IUser } from '../schemas/interfaces/user.interface';
import { UserService } from '../user.service';
import { AuthService } from '~/auth/auth.service';
export declare class UserResolver {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    requestResetCollaboratorPassword(oldPassword: string, currentUser: IUser): Promise<any>;
}

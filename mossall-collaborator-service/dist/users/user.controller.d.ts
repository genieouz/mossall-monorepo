import { DemandeService } from '~/demande/services/demande.service';
import { UserService } from './user.service';
export declare class UserController {
    private demandeService;
    private userService;
    constructor(demandeService: DemandeService, userService: UserService);
    getCollaboratorBalance(userId: string): Promise<number>;
}

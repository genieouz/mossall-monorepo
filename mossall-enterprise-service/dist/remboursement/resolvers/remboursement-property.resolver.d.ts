import { DemandeService } from '~/demande/services/demande.service';
import { IDemande } from '~/demande/schemas/interfaces/demande.interface';
import { IRemboursement } from '../schemas/interfaces/remboursement.interface';
import { UserService } from '~/users/user.service';
export declare class RemboursementPropertyResolver {
    private demandeService;
    private userService;
    constructor(demandeService: DemandeService, userService: UserService);
    demande(remboursement: IRemboursement): Promise<IDemande & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    user(remboursement: IRemboursement): Promise<import("../../users/schemas/interfaces/user.interface").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    validatedBy(remboursement: IRemboursement): Promise<import("../../users/schemas/interfaces/user.interface").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}

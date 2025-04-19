import { IUser } from '~/users/schemas/interfaces/user.interface';
import { RemboursementService } from '../services/remboursement.service';
import { IRemboursement } from '../schemas/interfaces/remboursement.interface';
export declare class RemboursementResolver {
    private rembourserService;
    constructor(rembourserService: RemboursementService);
    validateRemboursement(remboursementId: string, user: IUser): Promise<boolean>;
    myRemboursements(user: IUser): Promise<IRemboursement[]>;
    fetchRemboursementByUserId(userId: string): Promise<IRemboursement[]>;
    fetchAllRemboursements(): Promise<IRemboursement[]>;
    fetchRemboursementsByDemande(demandeId: string): Promise<IRemboursement[]>;
}

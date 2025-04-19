import { DemandeService } from '~/demande/services/demande.service';
import { Wallet } from '~/users/enums/wallet.enum';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { CollaboratorsService } from './collaborators.service';
export declare class CollaboratorsResolver {
    private readonly collaboratorsService;
    private demandeService;
    private userService;
    constructor(collaboratorsService: CollaboratorsService, demandeService: DemandeService, userService: UserService);
    updateMyBankAccount(bankAccoutNumber: any, currentUser: IUser): Promise<boolean>;
    updateMyFavoriteWallet(favoriteWallet: Wallet, currentUser: IUser): Promise<boolean>;
    checkMyBalance(currentUser: IUser): Promise<number>;
}

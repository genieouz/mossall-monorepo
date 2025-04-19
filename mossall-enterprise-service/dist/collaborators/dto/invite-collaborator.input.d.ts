import { Wallet } from "~/payment/enums/wallet.enum";
export declare class InviteCollaboratorInput {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    position: string;
    uniqueIdentifier: string;
    salary?: number;
    wizallAccountNumber?: string;
    bankAccountNumber?: string;
    birthDate?: Date;
    favoriteWallet?: Wallet;
}

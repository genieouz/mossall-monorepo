import { Wallet } from '~/payment/enums/wallet.enum';
export declare class UpdateMyAdminProfileInput {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    birthDate: Date;
    favoriteWallet: Wallet;
    enableEmailNotification: boolean;
}

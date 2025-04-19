import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { EnumState } from '~/commons/interfaces/state.interface';
import { Wallet } from '~/payment/enums/wallet.enum';
export declare class User extends Timestamps {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    organization: string;
    phoneNumber: string;
    address: string;
    position: string;
    uniqueIdentifier: string;
    salary?: number;
    balance?: number;
    wizallAccountNumber?: string;
    bankAccountNumber?: string;
    totalDemandeAmount: number;
    role?: string;
    blocked?: boolean;
    birthDate: Date;
    favoriteWallet: Wallet;
    enableEmailNotification: boolean;
    status: EnumState;
}
declare const PaginatedUserResult_base: any;
export declare class PaginatedUserResult extends PaginatedUserResult_base {
}
export {};

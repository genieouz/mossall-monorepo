import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { User } from '~/users/dto/user.entity';
export declare class Demande extends Timestamps {
    id: string;
    amount: number;
    number: number;
    fees: number;
    status: string;
    colloborator: User;
    rejectedReason: string;
    refundDuration: number;
    remainingRefundAmount: number;
}
declare const PaginatedDemandeResult_base: any;
export declare class PaginatedDemandeResult extends PaginatedDemandeResult_base {
}
export declare class CountStatusDemande {
    pending: number;
    rejected: number;
    validated: number;
    payed: number;
    cancelled: number;
}
export {};

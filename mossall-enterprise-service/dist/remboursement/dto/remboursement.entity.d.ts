import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
export declare class Remboursement extends Timestamps {
    id: string;
    amount: number;
    number: number;
    fees: number;
    status: string;
    demandeId: string;
    userId: string;
    validatedAt: Date;
}

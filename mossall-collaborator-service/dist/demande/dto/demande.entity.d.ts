import { Timestamps } from "~/commons/graphql/types/timestamps/timestamps.entity";
export declare class Demande extends Timestamps {
    id: string;
    amount: number;
    number: number;
    fees: number;
    status: string;
    rejectedReason: string;
}

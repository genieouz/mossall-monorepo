import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
export declare class Event extends Timestamps {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    amount: number;
    amountUnit: string;
    refundDuration: number;
    refundDurationUnit: string;
    activated: boolean;
    activatedAt: Date;
    autoValidate: boolean;
    addedBy?: string;
}
declare const PaginatedEventResult_base: any;
export declare class PaginatedEventResult extends PaginatedEventResult_base {
}
export {};

import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
export declare class Service extends Timestamps {
    id: string;
    title: string;
    description: string;
    identifier: string;
    refundDurationMonth: Number;
    available: boolean;
    publishedAt: Date;
    addedBy?: string;
}
declare const PaginatedServiceResult_base: any;
export declare class PaginatedServiceResult extends PaginatedServiceResult_base {
}
export {};

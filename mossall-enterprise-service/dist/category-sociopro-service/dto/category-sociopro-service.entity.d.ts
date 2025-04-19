import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
export declare class CategorySocioproService extends Timestamps {
    id: string;
    amount: number;
    amountUnit: string;
    refundDuration: number;
    refundDurationUnit: string;
    activated: boolean;
    activatedAt: Date;
    autoValidate: boolean;
    organisationServiceId: string;
    categorySocioproId: string;
    eventId?: string;
}
declare const PaginatedCategorySocioproServiceResult_base: any;
export declare class PaginatedCategorySocioproServiceResult extends PaginatedCategorySocioproServiceResult_base {
}
export {};

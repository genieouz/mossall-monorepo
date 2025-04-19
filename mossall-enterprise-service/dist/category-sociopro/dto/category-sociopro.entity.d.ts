import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
export declare class CategorySociopro extends Timestamps {
    id: string;
    title: string;
    description: string;
    activated: boolean;
    organizationId: string;
    addedBy?: string;
}
declare const PaginatedCategorySocioproResult_base: any;
export declare class PaginatedCategorySocioproResult extends PaginatedCategorySocioproResult_base {
}
export {};

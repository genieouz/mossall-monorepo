import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
export declare class OrganisationService extends Timestamps {
    id: string;
    amount: number;
    amountUnit: string;
    refundDuration: number;
    refundDurationUnit: string;
    activated: boolean;
    activatedAt: Date;
    activationDurationDay: number;
    autoValidate: boolean;
    organizationId: string;
    serviceId: string;
}
declare const PaginatedOrganisationServiceResult_base: any;
export declare class PaginatedOrganisationServiceResult extends PaginatedOrganisationServiceResult_base {
}
export {};

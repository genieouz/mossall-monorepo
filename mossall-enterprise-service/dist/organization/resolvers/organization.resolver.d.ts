import { CollaboratorsService } from '~/collaborators/collaborators.service';
import { DemandesMetricsInput } from '~/demande/dto/demandes-metrics.input';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { IOrganization } from '../schemas/interfaces/organization.interface';
import { OrganizationService } from '../services/organization.service';
import { IPagination } from '~/commons/graphql/pagination';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
export declare class OrganizationResolver {
    private organizationService;
    private collaboratorService;
    private userService;
    constructor(organizationService: OrganizationService, collaboratorService: CollaboratorsService, userService: UserService);
    createOrganization(organizationInput: IOrganization): Promise<IOrganization>;
    createFinancialOrganization(organizationInput: IOrganization): Promise<IOrganization>;
    updateOrganization(organizationInput: IOrganization, organizationId: string): Promise<boolean>;
    fetchOrganizations(): Promise<IOrganization[]>;
    fetchOrganization(organizationId: string): Promise<IOrganization>;
    fetchOrganizationCollaborators(demandesMetricsInput: DemandesMetricsInput, org: IOrganization): Promise<any>;
    fetchPaginatedOrganisationCol(demandesMetricsInput: DemandesMetricsInput, org: IOrganization): Promise<{
        results: IUser[];
        pagination: import("~/commons/graphql/pagination").PaginationInfo;
    }>;
    fetchPaginatedOrganizationCollaborators(demandesMetricsInput: DemandesMetricsInput, org: IOrganization, queryDataConfig: QueryDataConfigInput, hasPendingDemandes: boolean): Promise<IPagination<IUser>>;
    fetchOrganizationAdmins(org: IOrganization): Promise<any>;
    fetchPaginatedOrganisationAdmins(demandesMetricsInput: DemandesMetricsInput, org: IOrganization, queryDataConfig: QueryDataConfigInput): Promise<{
        results: IUser[];
        pagination: import("~/commons/graphql/pagination").PaginationInfo;
    }>;
}

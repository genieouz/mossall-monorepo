import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { DemandesMetricsInput } from '../dto/demandes-metrics.input';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { DemandeService } from '../services/demande.service';
import { IPagination } from '~/commons/graphql/pagination';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { DemandeStatus } from '../enums/demande-status.enum';
export declare class DemandeResolver {
    private demandeService;
    private userService;
    constructor(demandeService: DemandeService, userService: UserService);
    cancelDemandeByAdmin(demandeId: string, user: IUser): Promise<boolean>;
    rejectDemandeByAdmin(demandeId: string, rejectedReason: string, user: IUser): Promise<boolean>;
    validateDemande(demandeId: string, user: IUser): Promise<boolean>;
    payeDemande(demandeId: string, user: IUser): Promise<boolean>;
    fetchOrganizationDemandes(currentUser: IUser, metricsInput: DemandesMetricsInput, org: IOrganization): Promise<IDemande[]>;
    fetchPaginatedOrganizationDemandes(currentUser: IUser, metricsInput: DemandesMetricsInput, org: IOrganization, queryDataConfig: QueryDataConfigInput, organizationServiceId?: string): Promise<IPagination<IDemande>>;
    fetchDemandesByCollaborator(collaboratorId: string, status: DemandeStatus): Promise<IDemande[]>;
    fetchDemandesMetrics(user: IUser, demandesMetricsInput: DemandesMetricsInput, org: IOrganization): Promise<{
        total: any;
        remaining: any;
        payed: {
            amount: number;
            month: number;
            year: number;
        }[];
    }>;
    fetchSupportPaiement(org: IOrganization): Promise<IDemande[]>;
    fetchCountStatus(organisation: IOrganization, filter: DemandesMetricsInput): Promise<{
        pending: number;
        validated: number;
        rejected: number;
        payed: number;
        cancelled: number;
    }>;
    fetchTotalDemandesAmount(org: IOrganization, status: DemandeStatus, filter: DemandesMetricsInput): Promise<number>;
}

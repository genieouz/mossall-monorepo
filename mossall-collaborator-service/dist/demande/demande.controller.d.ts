import { IUser } from '~/users/schemas/interfaces/user.interface';
import { DemandesMetricsInput } from './dto/demandes-metrics.input';
import { DemandeService } from './services/demande.service';
export declare class DemandeController {
    private demandeService;
    constructor(demandeService: DemandeService);
    fetchUserDemandes(userId: string): Promise<import("./schemas/interfaces/demande.interface").IDemande[]>;
    fetchOrganizationDemandes(organizationId: string, metricsInput: DemandesMetricsInput): Promise<import("./schemas/interfaces/demande.interface").IDemande[]>;
    validateDemande(demandeId: string, admin: IUser): Promise<boolean>;
    payeDemande(demandeId: string, admin: IUser): Promise<boolean>;
    fetchDemandesMetrics(admin: IUser, metricsInput: DemandesMetricsInput): Promise<{
        total: any;
        remaining: any;
        payed: {
            amount: number;
            month: number;
            year: number;
        }[];
    }>;
}

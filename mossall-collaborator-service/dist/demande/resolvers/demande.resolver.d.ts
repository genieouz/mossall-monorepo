import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { DemandeMetric, DemandeMetricFilter } from '../dto/demande-metrics.entity';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { DemandeService } from '../services/demande.service';
export declare class DemandeResolver {
    private demandeService;
    private userService;
    constructor(demandeService: DemandeService, userService: UserService);
    addDemande(demandeInput: IDemande, currentUser: any): Promise<IDemande>;
    updateDemande(demandeInput: IDemande, demandeId: string, currentUser: IUser): Promise<boolean>;
    cancelDemande(demandeId: string, currentUser: IUser): Promise<boolean>;
    fetchMyDemandesMetrics(metricsFilter: DemandeMetricFilter, currentUser: IUser): Promise<DemandeMetric[]>;
    checkMyDemandeFees(amount: number, currentUser: IUser): Promise<number>;
    fetchMyDemandes(currentUser: IUser): Promise<IDemande[]>;
    fetchMyDemande(demandeId: string, currentUser: IUser): Promise<IDemande>;
}

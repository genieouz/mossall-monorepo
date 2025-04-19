import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { UserService } from '~/users/user.service';
import { DemandeStatus } from '../enums/demande-status.enum';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { DemandesMetricsInput } from '../dto/demandes-metrics.input';
import { NotificationService } from '~/notification/services/notification.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaymentService } from '~/payment/services/payment.service';
import { OrganizationService } from '~/organization/services/organization.service';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { ServiceService } from '~/service/services/service.service';
export declare class DemandeService extends AbstractService<IDemande> {
    #private;
    private userService;
    private notificationService;
    private eventEmitter;
    private paymentService;
    private organizationService;
    private produitService;
    constructor(model: Model<IDemande>, userService: UserService, notificationService: NotificationService, eventEmitter: EventEmitter2, paymentService: PaymentService, organizationService: OrganizationService, produitService: ServiceService);
    cancel(demandeId: string, currentUser: IUser): Promise<boolean>;
    validate(demandeId: string, admin: IUser, autovalidate?: boolean): Promise<boolean>;
    paye(demandeId: string, admin: IUser): Promise<boolean>;
    cancelByAdmin(demandeId: string, admin: IUser): Promise<boolean>;
    rejectByAdmin(demandeId: string, admin: IUser, rejectedReason: string): Promise<boolean>;
    checkAmount(newDemandeAmount: number, user: IUser, forUpdate?: number): Promise<boolean>;
    checkAmountOrFail(newDemandeAmount: number, user: IUser, forUpdate?: number): Promise<void>;
    maxAmountAuthorized(user: IUser): Promise<any>;
    getBalance(user: IUser): Promise<number>;
    getTotalDemandeAmount(user: IUser): Promise<number>;
    getDemandesMetrics(organization: string, metricsInput: DemandesMetricsInput): Promise<{
        total: any;
        remaining: any;
        payed: {
            amount: number;
            month: number;
            year: number;
        }[];
    }>;
    getSupportPaiement(organization: IOrganization): Promise<IDemande[]>;
    findByCollaborator(collaboratorId: string, status?: DemandeStatus): Promise<IDemande[]>;
}

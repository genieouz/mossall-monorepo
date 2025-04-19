import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { UserService } from '~/users/user.service';
import { DemandeInput } from '../dto/demande.input';
import { DemandeUpdateInput } from '../dto/demande.update.input';
import { DemandesMetricsInput } from '../dto/demandes-metrics.input';
import { NotificationService } from '~/notification/services/notification.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DemandeMetricFilter } from '../dto/demande-metrics.entity';
import { OrganizationService } from '~/organization/services/organization.service';
import { IUser } from '~/users/schemas/interfaces/user.interface';
export declare class DemandeService extends AbstractService<IDemande> {
    #private;
    private userService;
    private notificationService;
    private eventEmitter;
    private organizationService;
    constructor(model: Model<IDemande>, userService: UserService, notificationService: NotificationService, eventEmitter: EventEmitter2, organizationService: OrganizationService);
    create(demandeInput: DemandeInput, currentUser: any): Promise<IDemande>;
    update(demandeId: string, demandeInput: DemandeUpdateInput, currentUser: IUser): Promise<boolean>;
    cancel(demandeId: string, currentUser: IUser): Promise<boolean>;
    validate(demandeId: string, admin: IUser): Promise<boolean>;
    paye(demandeId: string, admin: IUser): Promise<boolean>;
    checkAmount(newDemandeAmount: number, user: IUser, forUpdate?: number): Promise<boolean>;
    checkAmountOrFail(newDemandeAmount: number, user: IUser, forUpdate?: number): Promise<void>;
    maxAmountAuthorized(user: IUser): Promise<any>;
    getBalance(user: IUser): Promise<number>;
    getTotalDemandeAmount(user: IUser): Promise<number>;
    getMyDemandesMetrics(metricsFilter: DemandeMetricFilter, owner: string): Promise<{
        value: number;
        month: number;
        year: number;
    }[]>;
    getDemandesMetrics(admin: IUser, metricsInput: DemandesMetricsInput): Promise<{
        total: any;
        remaining: any;
        payed: {
            amount: number;
            month: number;
            year: number;
        }[];
    }>;
}

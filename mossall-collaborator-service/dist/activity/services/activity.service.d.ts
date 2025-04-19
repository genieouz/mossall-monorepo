import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IActivity } from '../schemas/interfaces/activity.interface';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { OrganizationService } from '~/organization/services/organization.service';
import { PaymentService } from '~/payment/services/payment.service';
import { IDemande } from '~/demande/schemas/interfaces/demande.interface';
import { DemandeService } from '~/demande/services/demande.service';
export declare class Activitieservice extends AbstractService<IActivity> {
    private organizationService;
    private paymentService;
    private demandeService;
    private readonly logger;
    constructor(model: Model<IActivity>, organizationService: OrganizationService, paymentService: PaymentService, demandeService: DemandeService);
    CreateDemande(payload: {
        user: IUser;
        initialValue: IDemande;
    }): Promise<void>;
    UpdateDemande(payload: {
        user: IUser;
        initialValue: IDemande;
    }): Promise<void>;
    CancelByCollaboratorDemande(payload: {
        user: IUser;
        initialValue: IDemande;
    }): Promise<void>;
    CancelByAdminDemande(payload: {
        user: IUser;
        initialValue: IDemande;
    }): Promise<void>;
    RejectDemande(payload: {
        user: IUser;
        initialValue: IDemande;
    }): Promise<void>;
    ValidateDemande(payload: {
        user: IUser;
        initialValue: IDemande;
    }): Promise<void>;
    PayeDemande(payload: {
        user: IUser;
        initialValue: IDemande;
    }): Promise<void>;
    createDemandeActivity(user: IUser, initialValue: IDemande): Promise<IActivity>;
}

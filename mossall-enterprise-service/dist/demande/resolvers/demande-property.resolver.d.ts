import { UserService } from '~/users/user.service';
import { PaymentService } from '~/payment/services/payment.service';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { RemboursementService } from '~/remboursement/services/remboursement.service';
export declare class DemandePropertyResolver {
    private userService;
    private paymentService;
    private organisationServiceService;
    private remboursementService;
    constructor(userService: UserService, paymentService: PaymentService, organisationServiceService: OrganisationServiceService, remboursementService: RemboursementService);
    collaborator(demande: IDemande): Promise<import("../../users/schemas/interfaces/user.interface").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    statusText(demande: IDemande): Promise<string>;
    organisationService(demande: IDemande): Promise<import("../../organisation-service/schemas/interfaces/organisation-service.interface").IOrganisationService & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remboursements(demande: IDemande): Promise<import("../../remboursement/schemas/interfaces/remboursement.interface").IRemboursement[]>;
}

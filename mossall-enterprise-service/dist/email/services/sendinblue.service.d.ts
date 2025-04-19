import { IDemande } from '~/demande/schemas/interfaces/demande.interface';
export declare class SendinblueService {
    client: any;
    apiKey: any;
    constructor();
    sendInvitationToOrganizationAdmin({ email, password, frontUrl, }: {
        email: any;
        password: any;
        frontUrl: any;
    }): Promise<boolean>;
    inviteCollaborator({ email, password }: {
        email: any;
        password: any;
    }): Promise<boolean>;
    notifyCollaboratorForDemandeStatusChanged({ email, demande, }: {
        email: string;
        demande: IDemande;
    }): Promise<boolean>;
    sendForgotPasswordCode({ email, password }: {
        email: any;
        password: any;
    }): Promise<boolean>;
    sendEmail(params: any, to: any[], templateId: number): Promise<boolean>;
}

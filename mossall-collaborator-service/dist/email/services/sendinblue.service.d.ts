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
    notifyCollaboratorForDemandeStatusChanged({ emails, demande, action, collaboratorName, }: {
        emails: any;
        demande: IDemande;
        collaboratorName: string;
        action: string;
    }): Promise<boolean>;
    sendForgotPasswordCode({ email, password }: {
        email: any;
        password: any;
    }): Promise<boolean>;
    sendResetPasswordSuccess({ email }: {
        email: any;
    }): Promise<boolean>;
    sendEmail(params: any, to: any[], templateId: number, additionalSibParams?: {}): Promise<boolean>;
}

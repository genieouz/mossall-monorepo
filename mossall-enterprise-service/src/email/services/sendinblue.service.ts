import { Injectable } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { capitalize } from 'lodash';
import { OnEvent } from '@nestjs/event-emitter';
import { ADMIN_FRONT_URL, SENDINBLUE_API_KEY } from '~/config/env';
import { IDemande } from '~/demande/schemas/interfaces/demande.interface';
import { DemandeStatusText } from '~/demande/demande.utils';

@Injectable()
export class SendinblueService {
  client: any;
  apiKey: any;

  constructor() {
    this.client = SibApiV3Sdk.ApiClient.instance;
    this.apiKey = this.client.authentications['api-key'];
    this.apiKey.apiKey = SENDINBLUE_API_KEY;
  }

  @OnEvent('organization.created')
  async sendInvitationToOrganizationAdmin({
    email,
    password,
    frontUrl,
  }): Promise<boolean> {
    return this.sendEmail(
      { email, password, frontUrl: frontUrl || ADMIN_FRONT_URL },
      [{ email }],
      39,
    );
  }

  @OnEvent('collaborator.invite')
  async inviteCollaborator({ email, password }): Promise<boolean> {
    return this.sendEmail({ email, password }, [{ email }], 38);
  }

  @OnEvent('email.demande.status.changed')
  async notifyCollaboratorForDemandeStatusChanged({
    email,
    demande,
  }: {
    email: string;
    demande: IDemande;
  }): Promise<boolean> {
    const demandeNumber = demande.number;
    const demandeStatus = demande.status;
    const demandeStatusText = DemandeStatusText[demande.status];
    const demandeRejectedReason = demande.rejectedReason;
    const demandeAmount = demande.amount;
    return this.sendEmail(
      {
        email,
        demandeNumber,
        demandeStatus,
        demandeStatusText,
        demandeRejectedReason,
        demandeAmount,
      },
      [{ email }],
      42,
    );
  }
  @OnEvent('startforgotpassword')
  async sendForgotPasswordCode({ email, password }): Promise<boolean> {
    return this.sendEmail({ email, password }, [{ email }], 40);
  }
  async sendEmail(
    params: any,
    to: any[],
    templateId: number,
  ): Promise<boolean> {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail: any = {
      to,
      templateId,
      params,
    };
    try {
      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log({ data });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

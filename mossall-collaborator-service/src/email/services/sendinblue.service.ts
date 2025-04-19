import { Injectable } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { capitalize } from 'lodash';
import { OnEvent } from '@nestjs/event-emitter';
import { ADMIN_FRONT_URL, SENDINBLUE_API_KEY } from '~/config/env';
import { IDemande } from '~/demande/schemas/interfaces/demande.interface';
import { DemandeAction } from '~/demande/enums/demande-action.enum';

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
    return this.sendEmail({ email, password, frontUrl }, [{ email }], 39);
  }

  @OnEvent('collaborator.invite')
  async inviteCollaborator({ email, password }): Promise<boolean> {
    return this.sendEmail({ email, password }, [{ email }], 38);
  }

  @OnEvent('email.demande.status.changed')
  async notifyCollaboratorForDemandeStatusChanged({
    emails,
    demande,
    action,
    collaboratorName,
  }: {
    emails: any;
    demande: IDemande;
    collaboratorName: string;
    action: string;
  }): Promise<boolean> {
    const demandeNumber = demande.number;
    const demandeStatus = demande.status;
    let demandeStatusText = demande.status;
    if (action === DemandeAction.create) {
      demandeStatusText = 'créé';
    } else if (action === DemandeAction.update) {
      demandeStatusText = 'modifié';
    } else if (action === DemandeAction.cancel) {
      demandeStatusText = 'annulé';
    }
    const demandeAmount = demande.amount;
    return this.sendEmail(
      {
        demandeNumber,
        demandeStatus,
        demandeStatusText,
        demandeAmount,
        collaboratorName,
        frontUrl: ADMIN_FRONT_URL,
      },
      emails,
      43,
      {
        subject: `Demande ${demandeStatusText}e`,
      },
    );
  }
  @OnEvent('startforgotpassword')
  async sendForgotPasswordCode({ email, password }): Promise<boolean> {
    console.log({ email, password });
    return this.sendEmail({ email, password }, [{ email }], 40);
  }

  @OnEvent('finalizeforgotpassword')
  async sendResetPasswordSuccess({ email }): Promise<boolean> {
    return this.sendEmail({ email }, [{ email }], 41);
  }

  async sendEmail(
    params: any,
    to: any[],
    templateId: number,
    additionalSibParams = {},
  ): Promise<boolean> {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail: any = {
      ...additionalSibParams,
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

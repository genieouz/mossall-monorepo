import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IActivity } from '../schemas/interfaces/activity.interface';
import { activityModelName } from '../schemas/activity.model-name';
import { OnEvent } from '@nestjs/event-emitter';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { DateFormatter } from '~/commons/time';
import { ActivityScope } from '../enums/activity-scope.enum';
import { OrganizationService } from '~/organization/services/organization.service';
import { PaymentService } from '~/payment/services/payment.service';
import { IDemande } from '~/demande/schemas/interfaces/demande.interface';
import { DemandeService } from '~/demande/services/demande.service';

@Injectable()
export class Activitieservice extends AbstractService<IActivity> {
  private readonly logger = new Logger(`🖇️ ${Activitieservice.name}🖇️`);
  constructor(
    @InjectModel(activityModelName) model: Model<IActivity>,
    private organizationService: OrganizationService,
    private paymentService: PaymentService,
    private demandeService: DemandeService
  ) {
    super(model, ['message']);
  }

  @OnEvent('activity.demande.create')
  async CreateDemande(payload: { user: IUser, initialValue: IDemande }) {
    const { user, initialValue } = payload;
    const activity = await this.createDemandeActivity(user, initialValue);
    const message = `${ user.firstName } ${ user.lastName }(${user.email}) a créé une nouvelle demande d'un montant de ${ activity.initialValue?.amount }. 
    Demande N°: ${ activity.initialValue?.number }, 
    ${activity.message}`;
    const org = await this.organizationService.findOneById(user.organization);
    this.logger.log(`Organization ${org.name}: ${message}`);
    await this.insertOne({ ...activity, message, scope: ActivityScope.demande } as IActivity);
  }

  @OnEvent('activity.demande.update')
  async UpdateDemande(payload: { user: IUser, initialValue: IDemande }) {
    const { user, initialValue } = payload;
    const activity = await this.createDemandeActivity(user, initialValue);
    const message = `${ user.firstName } ${ user.lastName }(${user.email}) a modifié sa demande N°${ activity.initialValue?.number }. 
    ${activity.message}`;
    const org = await this.organizationService.findOneById(user.organization);
    this.logger.log(`Organization ${org.name}: ${message}`);
    await this.insertOne({ ...activity, message, scope: ActivityScope.demande } as IActivity);
  }

  @OnEvent('activity.demande.cancel-by-collaborator')
  async CancelByCollaboratorDemande(payload: { user: IUser, initialValue: IDemande }) {
    const { user, initialValue } = payload;
    const activity = await this.createDemandeActivity(user, initialValue);
    const message = `${ user.firstName } ${ user.lastName }(${user.email}) a annulé sa demande N°${ activity.initialValue?.number }. 
    ${activity.message}`;
    const org = await this.organizationService.findOneById(user.organization);
    this.logger.log(`Organization ${org.name}: ${message}`);
    await this.insertOne({ ...activity, message, scope: ActivityScope.demande } as IActivity);
  }

  @OnEvent('activity.demande.cancel-by-admin')
  async CancelByAdminDemande(payload: { user: IUser, initialValue: IDemande }) {
    const { user, initialValue } = payload;
    const activity = await this.createDemandeActivity(user, initialValue);
    const message = `l'admin ${ user.firstName } ${ user.lastName }(${user.email}) a annulé la demande N°${ activity.initialValue?.number }. 
    ${activity.message}`;
    const org = await this.organizationService.findOneById(user.organization);
    this.logger.log(`Organization ${org.name}: ${message}`);
    await this.insertOne({ ...activity, message, scope: ActivityScope.demande } as IActivity);
  }

  @OnEvent('activity.demande.reject')
  async RejectDemande(payload: { user: IUser, initialValue: IDemande }) {
    const { user, initialValue } = payload;
    const activity = await this.createDemandeActivity(user, initialValue);
    const message = `l'admin ${ user.firstName } ${ user.lastName }(${user.email}) a rejeté la demande N°${ activity.initialValue?.number }. 
    ${activity.message}, 
    Motif rejet: ${ activity.currentValue?.rejectedReason }, `;
    const org = await this.organizationService.findOneById(user.organization);
    this.logger.log(`Organization ${org.name}: ${message}`);
    await this.insertOne({ ...activity, message, scope: ActivityScope.demande } as IActivity);
  }

  @OnEvent('activity.demande.validate')
  async ValidateDemande(payload: { user: IUser, initialValue: IDemande }) {
    const { user, initialValue } = payload;
    const activity = await this.createDemandeActivity(user, initialValue);
    const payment = await this.paymentService.findOne({ 'meta.demandeId': String(activity.initialValue?.id || activity.initialValue?._id) })
    const message = `l'admin ${ user.firstName } ${ user.lastName }(${user.email}) a validé la demande N°${ activity.initialValue?.number }. 
    ${activity.message}, 
    Statut payment: ${ payment?.status }, `;
    const org = await this.organizationService.findOneById(user.organization);
    this.logger.log(`Organization ${org.name}: ${message}`);
    await this.insertOne({ ...activity, message, scope: ActivityScope.demande } as IActivity);
  }

  @OnEvent('activity.demande.paye')
  async PayeDemande(payload: { user: IUser, initialValue: IDemande }) {
    const { user, initialValue } = payload;
    const activity = await this.createDemandeActivity(user, initialValue);
    const message = `l'admin ${ user.firstName } ${ user.lastName }(${user.email}) a marqué "Remboursé" la demande N°${ activity.initialValue?.number }. 
    ${activity.message}`;
    const org = await this.organizationService.findOneById(user.organization);
    this.logger.log(`Organization ${org.name}: ${message}`);
    await this.insertOne({ ...activity, message, scope: ActivityScope.demande } as IActivity);
  }

  async createDemandeActivity(user: IUser, initialValue: IDemande) {
    const date = new Date();
    const formattedDate = DateFormatter.format(date, 'yyyy-MM-dd HH:mm:ss');
    const currentValue = await this.demandeService.findOneById(initialValue.id || initialValue._id);
    const activity: IActivity = {
      organization: user.organization,
      user: user.id || user._id,
      initialValue: initialValue.toObject?.() || initialValue,
      currentValue: currentValue.toObject?.() || currentValue,
      message: `Statut initial: ${ initialValue?.status }, 
      Statut actuel: ${ currentValue?.status }, 
      Montant: ${ currentValue?.amount }, 
      Date: ${formattedDate}`,
      meta: {},
      scope: ActivityScope.demande
    } as IActivity;

    return activity;
  }

}


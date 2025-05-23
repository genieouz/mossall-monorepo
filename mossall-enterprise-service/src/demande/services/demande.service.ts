import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { demandeModelName } from '../schemas/demande.model-name';
import { UserService } from '~/users/user.service';
import { User } from '~/users/dto/user.entity';
import { DemandeStatus } from '../enums/demande-status.enum';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { DemandesMetricsInput } from '../dto/demandes-metrics.input';
import { NotificationService } from '~/notification/services/notification.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getMonthNameFromIndex } from '~/commons/time';
import { PaymentService } from '~/payment/services/payment.service';
import { OrganizationService } from '~/organization/services/organization.service';
import { IActivity } from '~/activity/schemas/interfaces/activity.interface';
import { ActivityScope } from '~/activity/enums/activity-scope.enum';
import { AlalPaymentStatus } from '../enums/alal-payment-status.enum';
import { ObjectId } from 'bson';
import { SupportPaiement } from '../dto/support.entity';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { WaveFee, WaveFees } from '../demande.utils';

@Injectable()
export class DemandeService extends AbstractService<IDemande> {
  constructor(
    @InjectModel(demandeModelName) model: Model<IDemande>,
    private userService: UserService,
    private notificationService: NotificationService,
    private eventEmitter: EventEmitter2,
    private paymentService: PaymentService,
    private organizationService: OrganizationService,
  ) {
    super(model);
  }

  async cancel(demandeId: string, currentUser: IUser) {
    const demande = await this.findOneOrFail({
      _id: demandeId,
      owner: currentUser._id,
    });
    if (demande.status !== DemandeStatus.PENDING) {
      throw new BadRequestException(`Votre demande ne peux plus être annulé!`);
    }
    const result = await this.updateOneById(demandeId, {
      status: DemandeStatus.CANCELLED,
    });
    const user = await this.userService.getUserById(currentUser._id);
    this.eventEmitter.emit('notification.create', {
      entityId: demande.id,
      author: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: currentUser.email,
        id: currentUser._id,
        organization: user.organization,
      } as any,
      content: `${user.firstName} ${user.lastName} a annulé la demande N°${
        (demande as any).number
      }.`,
      organization: user.organization,
      title: `Demande N°${(demande as any).number}`,
    });
    return result;
  }

  async validate(demandeId: string, admin: IUser) {
    const demande = await this.findOneOrFail({ _id: demandeId });
    await this.userService.findOneOrFail({
      _id: demande.owner,
      blocked: { $ne: true },
    });
    if (
      String(admin.organization) != String(demande.organization) ||
      !['ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN_ORG', 'DRH', 'RH'].includes(
        admin.role,
      )
    ) {
      throw new ForbiddenException(
        'Vous ne pouvez pas effectuer cette action.',
      );
    }
    if (demande.status == DemandeStatus.CANCELLED) {
      throw new BadRequestException(`Votre demande ne peux plus être validé!`);
    }
    const date = new Date();
    await this.updateOneById(demande.id, {
      validatedByBeforeWebhook: admin.id || admin._id,
      validatedBy: admin.id || admin._id,
      pendingPayment: true,
      status: DemandeStatus.VALIDATED,
      validatedAt: date,
      validatedAtMonth: date.getMonth(),
      validatedAtYear: date.getFullYear(),
    });
    this.eventEmitter.emit('demande.status.changed', demande);
    // Tracking déplacé dans payment service
    // this.eventEmitter.emit('activity.demande.validate', { initialValue: demande, user: admin });
    const validatedBy = admin.id || admin._id;
    const result = await this.paymentService.validateDemande(
      demande,
      validatedBy,
    );
    if (!result) {
      throw new BadRequestException(
        'La transaction a échoué. Veuillez vérifier le numéro de téléphone du collaborateur.',
      );
    }

    return this.updateOneById(demandeId, {
      transactionReference: result.reference,
    });
  }

  async paye(demandeId: string, admin: IUser) {
    const demande = await this.findOneOrFail({ _id: demandeId });
    const payement = await this.paymentService.findOne({
      'meta.demandeId': String(demandeId),
    });
    if (!payement || payement.status != AlalPaymentStatus.success) {
      throw new BadRequestException(
        'Cette transaction ne peux pas être remboursée car avait échoué',
      );
    }
    if (
      String(admin.organization) != String(demande.organization) ||
      !['ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN_ORG', 'DRH', 'RH'].includes(
        admin.role,
      )
    ) {
      throw new ForbiddenException(
        'Vous ne pouvez pas effectuer cette action.',
      );
    }
    if (demande.status != DemandeStatus.VALIDATED) {
      throw new BadRequestException(`Votre demande n'est pas validé!`);
    }
    const date = new Date();

    const result = await this.updateOneById(demandeId, {
      status: DemandeStatus.PAYED,
      validatedAt: date,
      validatedAtMonth: date.getMonth(),
      validatedAtYear: date.getFullYear(),
    });
    this.eventEmitter.emit('demande.status.changed', demande);
    this.eventEmitter.emit('activity.demande.paye', {
      initialValue: demande,
      user: admin,
    });
    return result;
  }

  async cancelByAdmin(demandeId: string, admin: IUser) {
    const demande = await this.findOneOrFail({ _id: demandeId });
    if (
      String(admin.organization) != String(demande.organization) ||
      !['ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN_ORG', 'DRH', 'RH'].includes(
        admin.role,
      )
    ) {
      throw new ForbiddenException(
        'Vous ne pouvez pas effectuer cette action.',
      );
    }
    console.log('ICI');
    if (demande.status !== DemandeStatus.PENDING) {
      throw new BadRequestException(`Votre demande ne peux plus être annulé!`);
    }

    const result = await this.updateOneById(demandeId, {
      status: DemandeStatus.CANCELLED,
      cancelledAt: new Date(),
    });
    this.eventEmitter.emit('demande.status.changed', demande);
    this.eventEmitter.emit('activity.demande.cancel-by-admin', {
      initialValue: demande,
      user: admin,
    });
    return result;
  }

  async rejectByAdmin(demandeId: string, admin: IUser, rejectedReason: string) {
    const demande = await this.findOneOrFail({ _id: demandeId });
    if (
      String(admin.organization) != String(demande.organization) ||
      !['ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN_ORG', 'DRH', 'RH'].includes(
        admin.role,
      )
    ) {
      throw new ForbiddenException(
        'Vous ne pouvez pas effectuer cette action.',
      );
    }
    if (demande.status !== DemandeStatus.PENDING) {
      throw new BadRequestException(`Votre demande ne peux plus être rejetée!`);
    }

    const result = await this.updateOneById(demandeId, {
      status: DemandeStatus.REJECTED,
      rejectedAt: new Date(),
      rejectedReason,
      rejectedBy: admin.id || admin._id,
    });
    this.eventEmitter.emit('demande.status.changed', demande);
    this.eventEmitter.emit('activity.demande.reject', {
      initialValue: demande,
      user: admin,
    });
    return result;
  }

  async checkAmount(newDemandeAmount: number, user: IUser, forUpdate = 0) {
    const balance = await this.getBalance(user);
    if (newDemandeAmount > balance + forUpdate) {
      return false;
    }
    return true;
  }

  async checkAmountOrFail(
    newDemandeAmount: number,
    user: IUser,
    forUpdate = 0,
  ) {
    const possible = await this.checkAmount(newDemandeAmount, user, forUpdate);
    if (!possible) {
      throw new BadRequestException(
        'Le montant demandé est supérieur à votre balance!',
      );
    }
  }

  async maxAmountAuthorized(user: IUser): Promise<any> {
    // return user.salary * 0.75;
    const organization = await this.organizationService.findOneByIdOrFail(
      user.organization,
    );
    const percent = (user.salary * organization.amountPercent) / 100;
    return percent <= organization.maxDemandeAmount
      ? percent
      : organization.maxDemandeAmount;
  }

  async getBalance(user: IUser): Promise<number> {
    const totalDemande = await this.getTotalDemandeAmount(user);
    const maxAuthorized = await this.maxAmountAuthorized(user);
    return maxAuthorized - totalDemande;
  }

  async getTotalDemandeAmount(user: IUser): Promise<number> {
    const demandes = await this.aggregateTotal([
      {
        $match: { owner: user._id, status: { $in: ['VALIDATED', 'PENDING'] } },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);
    return demandes;
    // return demandes.map(d => d.amount).reduce((a, b) => a + b, 0);
  }

  async getDemandesMetrics(
    organization: string,
    metricsInput: DemandesMetricsInput,
  ) {
    let endDate = new Date(metricsInput.endDate);
    endDate.setDate(endDate.getDate() + 1);
    const total: any = await this.aggregateMany<{
      amount: number;
      month: number;
      year: number;
    }>([
      {
        $match: {
          status: { $in: [DemandeStatus.VALIDATED, DemandeStatus.PAYED] },
          organization: new ObjectId(organization),
          createdAt: { $gte: new Date(metricsInput.startDate), $lte: endDate },
        },
      },
      {
        $group: {
          _id: { month: '$validatedAtMonth', year: '$validatedAtYear' },
          date: { $first: '$validatedAt' },
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
      {
        $project: {
          _id: false,
          month: '$_id.month',
          year: '$_id.year',
          amount: '$total',
        },
      },
    ]);
    const payed = await this.aggregateMany<{
      amount: number;
      month: number;
      year: number;
    }>([
      {
        $match: {
          status: DemandeStatus.PAYED,
          organization: new ObjectId(organization),
          createdAt: {
            $gte: new Date(metricsInput.startDate),
            $lte: new Date(metricsInput.endDate),
          },
        },
      },
      {
        $group: {
          _id: { month: '$validatedAtMonth', year: '$validatedAtYear' },
          date: { $first: '$validatedAt' },
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
      {
        $project: {
          _id: false,
          month: '$_id.month',
          year: '$_id.year',
          amount: '$total',
        },
      },
    ]);

    const remaining = total.map((t) => {
      let payedMonth = payed.find(
        (p) => p.month == t.month && p.year == t.year,
      );
      t.date = `${getMonthNameFromIndex(t.month || 0)} ${t.year}`;
      return {
        month: t.month,
        year: t.year,
        amount: t.amount - (payedMonth?.amount || 0),
        date: `${getMonthNameFromIndex(t.month || 0)} ${t.year}`,
      };
    });
    return { total, remaining, payed };
  }

  async getSupportPaiement(organization: IOrganization) {
    //a modifier apres test le first day of current month
    const startDate = new Date();
    startDate.setDate(1);
    //a modifier apres test le last day of current month

    const endDate = new Date();
    endDate.setDate(1);
    endDate.setMonth(endDate.getMonth() + 1);
    const demandes = await this.aggregateMany<SupportPaiement>([
      {
        $match: {
          status: DemandeStatus.VALIDATED,
          createdAt: { $gte: startDate, $lt: endDate },
          organization: { $in: [organization._id, organization.id] },
        },
      },
      {
        $project: {
          _id: false,
          owner: '$owner',
          amount: { $add: ['$amount', { $multiply: ['$amount', WaveFees] }] },
        },
      },
      {
        $group: {
          _id: '$owner',
          amount: { $sum: '$amount' },
        },
      },

      {
        $project: {
          _id: false,
          owner: '$_id',
          amount: '$amount',
        },
      },
    ]);
    const users = await this.userService.findMany({
      _id: {
        $in: demandes.map((d) => d.owner),
      },
    });

    return demandes.map((d) => {
      const user = users.find((u) => u._id.toString() === d.owner.toString());
      return {
        ...d,
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        phoneNumber: user?.phoneNumber,
        uniqueIdentifier: user?.uniqueIdentifier,
      };
    });
  }
}

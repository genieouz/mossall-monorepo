import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { demandeModelName } from '../schemas/demande.model-name';
import { UserService } from '~/users/user.service';
import { DemandeInput } from '../dto/demande.input';
import { User } from '~/users/dto/user.entity';
import { DemandeStatus } from '../enums/demande-status.enum';
import { DemandeUpdateInput } from '../dto/demande.update.input';
import { getMonthNameFromIndex } from '~/commons/time';
import { DemandesMetricsInput } from '../dto/demandes-metrics.input';
import { NotificationService } from '~/notification/services/notification.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DemandeMetricFilter } from '../dto/demande-metrics.entity';
import { OrganizationService } from '~/organization/services/organization.service';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { DemandeAction } from '../enums/demande-action.enum';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { WaveFees } from '../demande.constant';
import { exit } from 'process';

@Injectable()
export class DemandeService extends AbstractService<IDemande> {
  #logger = new Logger(`🎰${DemandeService.name}🎰`);
  constructor(
    @InjectModel(demandeModelName) model: Model<IDemande>,
    private userService: UserService,
    private notificationService: NotificationService,
    private eventEmitter: EventEmitter2,
    private organizationService: OrganizationService,
  ) {
    super(model);
  }

  async create(demandeInput: DemandeInput, currentUser: any) {
    this.#logger.log(
      'create demande with payload ' + JSON.stringify(demandeInput),
    );
    this.#logger.warn('beginning the validation of request');
    if (!currentUser.bankAccountNumber) {
      this.#logger.warn('user not have bank account number');
      throw new PreconditionFailedException(
        "Vous n'avez pas encore renseigné votre numéro de compte bancaire.",
      );
    }
    if (!currentUser.phoneNumber) {
      this.#logger.warn('user not have phone number');
      throw new PreconditionFailedException(
        "Vous n'avez pas encore renseigné votre numéro de téléphone.",
      );
    }
    if (!currentUser.salary) {
      this.#logger.warn('user not have salary');
      throw new PreconditionFailedException(
        "Vous n'avez pas encore renseigné votre salaire.",
      );
    }
    const today = new Date();
    const { demandeDeadlineDay } = await this.organizationService.findOneById(
      currentUser.organization,
    );
    if (today.getDate() > demandeDeadlineDay) {
      this.#logger.warn('today is deadline day');
      throw new PreconditionFailedException(
        `La deadline de la demande est : ${today.getFullYear()} / ${today.getMonth()} / ${demandeDeadlineDay}`,
      );
    }
    const OnePending = await this.findOne({
      owner: currentUser._id,
      status: { $in: [DemandeStatus.PENDING, DemandeStatus.IN_PROCESS] },
    });
    if (OnePending) {
      throw new BadRequestException(
        'il y a déjà une demande en cours de validation!',
      );
    }
    await this.checkAmountOrFail(demandeInput.amount, currentUser);

    const result = await this.insertOne({
      ...demandeInput,
      organization: currentUser.organization,
      owner: currentUser._id,
      fees: demandeInput.amount * WaveFees,
    } as IDemande);
    this.eventEmitter.emit('notification.create', {
      entityId: result.id,
      author: {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        id: currentUser._id,
        organization: currentUser.organization,
      } as any,
      content: `${currentUser.firstName} ${currentUser.lastName} a ajouté une nouvelle demande de ${result.amount} XOF.`,
      organization: currentUser.organization,
      title: `Demande N°${(result as any).number}`,
    });
    this.eventEmitter.emit('demande.status.changed', {
      demande: result,
      action: DemandeAction.create,
    });
    this.eventEmitter.emit('activity.demande.create', {
      initialValue: result,
      user: currentUser,
    });
    return result;
  }

  async update(
    demandeId: string,
    demandeInput: DemandeUpdateInput,
    currentUser: IUser,
  ) {
    const demande = await this.findOneOrFail({
      _id: demandeId,
      owner: currentUser._id,
    });
    if (demande.status !== DemandeStatus.PENDING) {
      throw new BadRequestException(
        `Votre demande ne peux plus faire l'objet de modification!`,
      );
    }
    const user = (await this.userService.findById(currentUser._id)) as IUser;
    await this.checkAmountOrFail(demandeInput.amount, user, demande.amount);
    const result = await this.updateOneById(demandeId, {
      ...demandeInput,
      fees: demandeInput.amount * WaveFees,
    });
    this.eventEmitter.emit('demande.status.changed', {
      demande,
      action: DemandeAction.update,
    });
    this.eventEmitter.emit('activity.demande.update', {
      initialValue: demande,
      user: currentUser,
    });
    return result;
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
    this.eventEmitter.emit('notification.create', {
      entityId: demande.id,
      author: {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        id: currentUser._id,
        organization: currentUser.organization,
      } as any,
      content: `${currentUser.firstName} ${
        currentUser.lastName
      } a annulé la demande N°${(demande as any).number}.`,
      organization: currentUser.organization,
      title: `Demande N°${(demande as any).number}`,
    });
    this.eventEmitter.emit('demande.status.changed', {
      demande,
      action: DemandeAction.cancel,
    });
    this.eventEmitter.emit('activity.demande.cancel-by-collaborator', {
      initialValue: demande,
      user: currentUser,
    });
    return result;
  }

  async validate(demandeId: string, admin: IUser) {
    const demande = await this.findOneOrFail({ _id: demandeId });
    if (
      admin.organization != demande.organization ||
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

    return this.updateOneById(demandeId, {
      status: DemandeStatus.VALIDATED,
      validatedAt: date,
      validatedAtMonth: date.getMonth(),
      validatedAtYear: date.getFullYear(),
    });
  }

  async paye(demandeId: string, admin: IUser) {
    const demande = await this.findOneOrFail({ _id: demandeId });
    if (
      admin.organization != demande.organization ||
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

    return this.updateOneById(demandeId, {
      status: DemandeStatus.PAYED,
      validatedAt: date,
      validatedAtMonth: date.getMonth(),
      validatedAtYear: date.getFullYear(),
    });
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
    const demandes = await this.findMany({
      owner: user._id,
      status: { $in: ['VALIDATED', 'PENDING'] },
    });
    return demandes.map((d) => d.amount).reduce((a, b) => a + b, 0);
  }

  async getMyDemandesMetrics(
    metricsFilter: DemandeMetricFilter,
    owner: string,
  ) {
    let endDate = new Date(metricsFilter.endDate);
    endDate.setDate(endDate.getDate() + 1);
    const results = await this.aggregateMany<{
      value: number;
      month: number;
      year: number;
    }>([
      {
        $match: {
          status: { $in: [DemandeStatus.VALIDATED, DemandeStatus.PAYED] },
          owner,
          createdAt: { $gte: new Date(metricsFilter.startDate), $lte: endDate },
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
          month: { $add: ['$_id.month', 1] },
          year: '$_id.year',
          value: '$total',
        },
      },
    ]);
    return results;
    // const results = [];
    // for(let i=1; i<13; i++) {
    //   results.push({
    //       month: i,
    //       value: 0,
    //     })
    // }
    // return results;
  }

  async getDemandesMetrics(admin: IUser, metricsInput: DemandesMetricsInput) {
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
          organization: admin.organization,
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
          organization: admin.organization,
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
}

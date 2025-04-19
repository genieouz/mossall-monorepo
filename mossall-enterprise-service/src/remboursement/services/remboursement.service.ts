import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { IRemboursement } from '../schemas/interfaces/remboursement.interface';
import { InjectModel } from '@nestjs/mongoose';
import { remboursementModelName } from '../schemas/remboursement.model-name';
import { NotificationService } from '~/notification/services/notification.service';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { IDemande } from '~/demande/schemas/interfaces/demande.interface';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { RemboursementStatus } from '../enums/remboursement-status.enum';
import { UserService } from '~/users/user.service';
import { DemandeService } from '~/demande/services/demande.service';

@Injectable()
export class RemboursementService extends AbstractService<IRemboursement> {
  #logger = new Logger(`🎰${RemboursementService.name}🎰`);
  constructor(
    @InjectModel(remboursementModelName) model: Model<IRemboursement>,
    private userService: UserService,
    private demandeService: DemandeService, // private notificationService: NotificationService,
    private eventEmitter: EventEmitter2,
  ) {
    super(model);
  }

  @OnEvent('demande.validate')
  async handleDemandeCreatedEvent({
    demande,
    collab,
  }: {
    demande: IDemande;
    collab: IUser;
  }) {
    this.#logger.log('Start handling demande created event');

    const remboursements = [];

    for (let i = 0; i < demande.refundDuration; i++) {
      const remboursement = {
        amount: demande.amount / demande.refundDuration,
        number: i + 1,
        demandeId: demande._id,
        userId: collab._id,
      };

      remboursements.push(remboursement);
    }

    await this.insertMany(remboursements);

    this.#logger.log('End handling demande created event');
  }

  async validate(remboursementId: string, admin: IUser) {
    const remboursement = await this.findOneOrFail({ _id: remboursementId });
    const demande = await this.demandeService.findOneOrFail({
      _id: remboursement.demandeId,
    });

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

    if (remboursement.status == RemboursementStatus.PAYED) {
      throw new BadRequestException(`Votre demande a déjà été validé!`);
    }

    const date = new Date();
    await this.updateOneById(remboursement.id, {
      validatedBy: admin.id || admin._id,
      status: RemboursementStatus.PAYED,
      validatedAt: date,
      validatedAtMonth: date.getMonth(),
      validatedAtYear: date.getFullYear(),
    });

    this.eventEmitter.emit('demande.remboursement.done', demande);

    return true;
  }
}

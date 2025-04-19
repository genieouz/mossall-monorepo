import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { User } from '~/users/dto/user.entity';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { DemandeService } from './demande.service';
import { RemboursementService } from '~/remboursement/services/remboursement.service';
import { RemboursementStatus } from '~/remboursement/enums/remboursement-status.enum';
import { DemandeStatus } from '../enums/demande-status.enum';

@Injectable()
export class DemandeEventsService {
  constructor(
    private userService: UserService,
    private demandeService: DemandeService,
    private eventEmitter: EventEmitter2,
    private remboursementService: RemboursementService,
  ) {}

  @OnEvent('demande.status.changed')
  async demandeStatusChanged(demande: IDemande) {
    const user = await this.userService.findById(demande.owner);
    const totalDemandeAmount = await this.demandeService.getTotalDemandeAmount(
      user,
    );
    const balance = await this.demandeService.getBalance(user);
    await this.userService.updateOne(
      { _id: user._id },
      { balance, totalDemandeAmount },
    );
    const newDemande = await this.demandeService.findOneById(demande.id);
    this.eventEmitter.emit('email.demande.status.changed', {
      demande: newDemande,
      email: user.email,
    });
  }

  @OnEvent('demande.remboursement.done')
  async demandeRemboursementDone(demande) {
    const remboursements = await this.remboursementService.findMany({
      demandeId: demande._id,
    });

    const allRemboursementsDone = remboursements.every(
      (remboursement) => remboursement.status === RemboursementStatus.PAYED,
    );

    if (allRemboursementsDone) {
      await this.demandeService.updateOne(
        { _id: demande._id },
        {
          status: DemandeStatus.PAYED,
          remainingRefundAmount: 0,
        },
      );

      this.eventEmitter.emit('demande.status.changed', demande);
    } else {
      await this.demandeService.updateOne(
        { _id: demande._id },
        {
          remainingRefundAmount:
            demande.refundAmount - remboursements[0].amount,
        },
      );
      console.log('Not all remboursements are done');
    }
  }
}

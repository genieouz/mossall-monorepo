import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { User } from '~/users/dto/user.entity';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { DemandeService } from './demande.service';

@Injectable()
export class DemandeEventsService {
  constructor(
    private userService: UserService,
    private demandeService: DemandeService,
    private eventEmitter: EventEmitter2,
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
}

import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { User } from '~/users/dto/user.entity';
import { UserRole } from '~/users/enums/user-role.enum';
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
  async demandeStatusChanged({
    demande,
    action,
  }: {
    demande: IDemande;
    action: string;
  }) {
    const user = await this.userService.findById(demande.owner);
    const totalDemandeAmount = await this.demandeService.getTotalDemandeAmount(
      user,
    );
    const balance = await this.demandeService.getBalance(user);
    await this.userService.updateOne(
      { id: user._id },
      { balance, totalDemandeAmount },
    );
    const newDemande = await this.demandeService.findOneById(demande.id);
    const adminRoles = [
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
      UserRole.SUPER_ADMIN_ORG,
    ];
    const admins = await this.userService.findMany({
      organization: user.organization,
      enableEmailNotification: true,
      role: { $in: adminRoles },
    });
    const emails = admins.map((a) => ({ email: a.email }));
    this.eventEmitter.emit('email.demande.status.changed', {
      demande: newDemande,
      emails,
      action,
      collaboratorName: `${user.firstName} ${user.lastName}`,
    });
  }
}

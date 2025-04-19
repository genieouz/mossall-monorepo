import { IRemboursement } from '../schemas/interfaces/remboursement.interface';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IDemande } from '~/demande/schemas/interfaces/demande.interface';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { DemandeService } from '~/demande/services/demande.service';
export declare class RemboursementService extends AbstractService<IRemboursement> {
    #private;
    private userService;
    private demandeService;
    private eventEmitter;
    constructor(model: Model<IRemboursement>, userService: UserService, demandeService: DemandeService, eventEmitter: EventEmitter2);
    handleDemandeCreatedEvent({ demande, collab, }: {
        demande: IDemande;
        collab: IUser;
    }): Promise<void>;
    validate(remboursementId: string, admin: IUser): Promise<boolean>;
}

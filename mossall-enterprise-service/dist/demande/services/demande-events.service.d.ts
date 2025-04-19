import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from '~/users/user.service';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { DemandeService } from './demande.service';
import { RemboursementService } from '~/remboursement/services/remboursement.service';
export declare class DemandeEventsService {
    private userService;
    private demandeService;
    private eventEmitter;
    private remboursementService;
    constructor(userService: UserService, demandeService: DemandeService, eventEmitter: EventEmitter2, remboursementService: RemboursementService);
    demandeStatusChanged(demande: IDemande): Promise<void>;
    demandeRemboursementDone(demande: any): Promise<void>;
}

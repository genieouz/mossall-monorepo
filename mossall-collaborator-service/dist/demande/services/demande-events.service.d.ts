import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from '~/users/user.service';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { DemandeService } from './demande.service';
export declare class DemandeEventsService {
    private userService;
    private demandeService;
    private eventEmitter;
    constructor(userService: UserService, demandeService: DemandeService, eventEmitter: EventEmitter2);
    demandeStatusChanged({ demande, action, }: {
        demande: IDemande;
        action: string;
    }): Promise<void>;
}

import { HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from '~/users/user.service';
export declare class CollaboratorsService {
    private eventEmitter;
    private readonly userSerive;
    private httpService;
    constructor(eventEmitter: EventEmitter2, userSerive: UserService, httpService: HttpService);
    updateBankAccountNumber(bankAccountNumber: string, collaboratorId: string): Promise<boolean>;
}

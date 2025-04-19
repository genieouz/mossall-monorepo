import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { USER_SERVICE_URL } from '~/config/env';
import { UserService } from '~/users/user.service';

@Injectable()
export class CollaboratorsService {
    constructor(
        private eventEmitter: EventEmitter2,
        private readonly userSerive: UserService,
        private httpService: HttpService
    ) {
      }
    
    async updateBankAccountNumber(bankAccountNumber: string, collaboratorId: string): Promise<boolean> {
        const result = await this.httpService.put(`${USER_SERVICE_URL}/users/collaborator/${collaboratorId}/bank/number`, { bankAccountNumber }).toPromise();
        return result.data;
    }
}

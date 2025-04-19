import { HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
import { IDemande } from '~/collaborators/models/interfaces/demande.interface';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { UserService } from '~/users/user.service';
import { IPayment } from '../schemas/interfaces/payment.interface';
export declare class PaymentService extends AbstractService<IPayment> {
    private userService;
    private httpService;
    private eventEmitter;
    constructor(model: Model<IPayment>, userService: UserService, httpService: HttpService, eventEmitter: EventEmitter2);
    validateDemande(demande: IDemande, validatedBy: string): Promise<IPayment>;
    private newPayment;
}

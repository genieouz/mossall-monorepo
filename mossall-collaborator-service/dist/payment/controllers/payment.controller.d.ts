import { Disburse } from '../schemas/interfaces/alal-customer.interface';
import { PaymentService } from '../services/payment.service';
import { Request } from 'express';
import { DemandeService } from '~/demande/services/demande.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class PaymentController {
    private paymentService;
    private demandeService;
    private eventEmitter;
    private readonly logger;
    constructor(paymentService: PaymentService, demandeService: DemandeService, eventEmitter: EventEmitter2);
    updateDisburse(body: {
        event: string;
        data: Disburse;
    }, req: Request): Promise<void>;
}

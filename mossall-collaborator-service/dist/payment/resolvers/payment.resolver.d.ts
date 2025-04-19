import { IPayment } from '../schemas/interfaces/payment.interface';
import { PaymentService } from '../services/payment.service';
export declare class PaymentResolver {
    private paymentService;
    constructor(paymentService: PaymentService);
    fetchPayments(): Promise<IPayment[]>;
    fetchPayment(paymentId: string): Promise<IPayment>;
}

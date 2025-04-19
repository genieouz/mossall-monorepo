import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Payment } from '../dto/payment.entity';
import { PaymentInput } from '../dto/payment.input';
import { PaymentUpdateInput } from '../dto/payment.update.input';
import { IPayment } from '../schemas/interfaces/payment.interface';
import { PaymentService } from '../services/payment.service';

@Resolver()
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Query(returns => [Payment])
  fetchPayments(): Promise<IPayment[]> {
    return this.paymentService.findMany({});
  }

  @Query(returns => Payment)
  fetchPayment(
    @Args({ name: 'paymentId', type: () => ID }) paymentId: string,
  ): Promise<IPayment> {
    return this.paymentService.findOneByIdOrFail(paymentId);
  }
}

import {
  Directive,
  Parent,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { User } from '~/users/dto/user.entity';
import { UserService } from '~/users/user.service';
import { Demande } from '../dto/demande.entity';
import { IDemande } from '../../collaborators/models/interfaces/demande.interface';
import { PaymentService } from '~/payment/services/payment.service';
import { DemandeStatus } from '../enums/demande-status.enum';
import { AlalPaymentStatus } from '../enums/alal-payment-status.enum';

@Resolver((of) => Demande)
export class DemandePropertyResolver {
  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
  ) {}

  @ResolveField((returns) => User)
  async collaborator(@Parent() demande: IDemande) {
    return this.userService.findOne({ _id: demande.owner });
  }

  @ResolveField((returns) => String, { nullable: true })
  async statusText(@Parent() demande: IDemande) {

    if (demande.status != DemandeStatus.VALIDATED) {
      return demande.status;
    }

    const payment = await this.paymentService.findOne({ 'meta.demandeId': String(demande.id) });
    // if(String(demande.id) === "66a6a05b97e7dbced1788410") {
    //   console.log({payment})
    // }
    if(!payment) {
      return "Paie Echouée";
    }
    if(payment.status == 'success') {
      return "VALIDATED";
    } else if(payment.status === AlalPaymentStatus.pending || payment.status === AlalPaymentStatus.processing){
      return "Paie en cours";
    } else if(payment.status === AlalPaymentStatus.failed) {
      return "Paie Echouée";
    } else {
      return payment.status;
    }
  }
}

import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Remboursement } from '~/remboursement/dto/remboursement.entity';
import { DemandeService } from '~/demande/services/demande.service';
import { IDemande } from '~/demande/schemas/interfaces/demande.interface';
import { Demande } from '~/demande/dto/demande.entity';
import { IRemboursement } from '../schemas/interfaces/remboursement.interface';
import { UserService } from '~/users/user.service';
import { User } from '~/users/dto/user.entity';

@Resolver((of) => Remboursement)
export class RemboursementPropertyResolver {
  constructor(
    private demandeService: DemandeService,
    private userService: UserService,
  ) {}

  @ResolveField((returns) => Demande, { nullable: true })
  async demande(@Parent() remboursement: IRemboursement) {
    return this.demandeService.findOne({ _id: remboursement.demandeId });
  }

  @ResolveField((returns) => User, { nullable: true })
  async user(@Parent() remboursement: IRemboursement) {
    return this.userService.findOne({ _id: remboursement.userId });
  }

  @ResolveField((returns) => User, { nullable: true })
  async validatedBy(@Parent() remboursement: IRemboursement) {
    return this.userService.findOne({ _id: remboursement.validatedBy });
  }
}

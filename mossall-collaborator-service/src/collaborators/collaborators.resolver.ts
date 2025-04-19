import { UseGuards } from '@nestjs/common';
import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { DemandeService } from '~/demande/services/demande.service';
import { Wallet } from '~/users/enums/wallet.enum';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { CollaboratorsService } from './collaborators.service';
import { InviteCollaboratorInput } from './dto/invite-collaborator.input';
import { AuthGuard } from '~/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver()
export class CollaboratorsResolver {
  constructor(
    private readonly collaboratorsService: CollaboratorsService,
    private demandeService: DemandeService,
    private userService: UserService,
  ) {}

  @Mutation((returns) => Boolean)
  updateMyBankAccount(
    @Args({ name: 'bankAccountNumber', type: () => String })
    bankAccoutNumber: any,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.collaboratorsService.updateBankAccountNumber(
      bankAccoutNumber,
      currentUser._id,
    );
  }

  @Mutation((returns) => Boolean)
  updateMyFavoriteWallet(
    @Args({ name: 'wallet', type: () => Wallet }) favoriteWallet: Wallet,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.userService.updateOne(
      { id: currentUser._id },
      { favoriteWallet },
    );
  }

  @Query((returns) => Float)
  async checkMyBalance(@CurrentUser() currentUser: IUser): Promise<number> {
    return this.demandeService.getBalance(currentUser);
  }
}

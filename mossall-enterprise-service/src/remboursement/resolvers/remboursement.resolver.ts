import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '~/auth/auth.guard';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { RemboursementService } from '../services/remboursement.service';
import { IRemboursement } from '../schemas/interfaces/remboursement.interface';
import { Remboursement } from '../dto/remboursement.entity';

@UseGuards(AuthGuard)
@Resolver()
export class RemboursementResolver {
  constructor(private rembourserService: RemboursementService) {}

  @Mutation((returns) => Boolean)
  async validateRemboursement(
    @Args({ name: 'remboursementId', type: () => ID })
    remboursementId: string,
    @CurrentUser() user: IUser,
  ): Promise<boolean> {
    return this.rembourserService.validate(remboursementId, user);
  }

  @Query((returns) => [Remboursement])
  async myRemboursements(
    @CurrentUser() user: IUser,
  ): Promise<IRemboursement[]> {
    return this.rembourserService.findMany({ userId: user._id });
  }

  @Query((returns) => [Remboursement])
  async fetchRemboursementByUserId(
    @Args({ name: 'userId', type: () => ID }) userId: string,
  ): Promise<IRemboursement[]> {
    return this.rembourserService.findMany({ userId });
  }

  @Query((returns) => [Remboursement])
  async fetchAllRemboursements(): Promise<IRemboursement[]> {
    return this.rembourserService.findMany();
  }

  @Query((returns) => [Remboursement])
  async fetchRemboursementsByDemande(
    @Args({ name: 'demandeId', type: () => ID }) demandeId: string,
  ): Promise<IRemboursement[]> {
    return this.rembourserService.findMany({ demandeId });
  }
}

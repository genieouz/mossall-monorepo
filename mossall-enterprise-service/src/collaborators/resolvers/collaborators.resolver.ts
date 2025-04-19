import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { User } from '~/users/dto/user.entity';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { CollaboratorsService } from '../collaborators.service';
import { Demande } from '../../demande/dto/demande.entity';
import { InviteCollaboratorInput } from '../dto/invite-collaborator.input';
import { UpdateCollaboratorInput } from '../dto/update-collaborator.input';
import { DemandesMetricsInput } from '~/demande/dto/demandes-metrics.input';
import { DemandesMetrics } from '~/demande/dto/demandes-metrics.entity';
import { AuthGuard } from '~/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver()
export class CollaboratorResolver {
  constructor(
    private collaboratorService: CollaboratorsService,
    private userService: UserService,
  ) {}

  @Mutation((returns) => Boolean)
  async inviteCollaborator(
    @Args({ name: 'collaborator', type: () => InviteCollaboratorInput })
    collaborator: InviteCollaboratorInput,
    @CurrentUser() user: IUser,
  ): Promise<boolean> {
    return this.collaboratorService.inviteCollaborator(collaborator, user._id);
  }

  @Mutation((returns) => Boolean)
  async inviteAdmin(
    @Args({ name: 'admin', type: () => InviteCollaboratorInput })
    collaborator: InviteCollaboratorInput,
    @CurrentUser() user: IUser,
  ): Promise<boolean> {
    return this.collaboratorService.inviteAdmin(collaborator, user._id);
  }

  @Mutation((returns) => Boolean)
  async updateCollaborator(
    @Args({ name: 'collaborator', type: () => UpdateCollaboratorInput })
    collaborator: UpdateCollaboratorInput,
    @Args({ name: 'collaboratorId', type: () => String })
    collaboratorId: string,
  ): Promise<boolean> {
    return this.collaboratorService.updateCollaborator(
      collaborator,
      collaboratorId,
    );
  }

  @Query((returns) => User)
  async fetchOrganizationCollaborator(
    @Args({ name: 'collaboratorId', type: () => String })
    collaboratorId: string,
  ): Promise<IUser> {
    return this.userService.getUserById(collaboratorId);
  }

  // @Query(returns => [Demande])
  // async fetchOrganizationDemandes(
  //   @CurrentUser() currentUser: IUser,
  //   @Args({ name: 'metricsInput', type: () => DemandesMetricsInput, nullable: true })
  //   demandesMetricsInput: DemandesMetricsInput = { startDate: new Date("2024-01-01"), endDate: new Date("2030-12-31") }
  // ): Promise<IUser> {
  //   const user = await this.userService.getUserById(currentUser._id);
  //   return this.collaboratorService.getOrganizationDemandes(user.organization, demandesMetricsInput);
  // }

  // @Mutation(returns => Boolean)
  // async validateDemande(
  //   @Args({ name: 'demandeId', type: () => ID })
  //   demandeId: string,
  //   @CurrentUser() currentUser: IUser
  // ): Promise<boolean> {
  //   const user = await this.userService.getUserById(currentUser._id);

  //   return this.collaboratorService.validateDemande(demandeId, user);
  // }

  // @Mutation(returns => Boolean)
  // async payeDemande(
  //   @Args({ name: 'demandeId', type: () => ID })
  //   demandeId: string,
  //   @CurrentUser() currentUser: IUser
  // ): Promise<boolean> {
  //   const user = await this.userService.getUserById(currentUser._id);

  //   return this.collaboratorService.payeDemande(demandeId, user);
  // }

  // @Mutation(returns => Boolean)
  // async cancelDemandeByAdmin(
  //   @Args({ name: 'demandeId', type: () => ID })
  //   demandeId: string,
  //   @CurrentUser() currentUser: IUser
  // ): Promise<boolean> {
  //   const user = await this.userService.getUserById(currentUser._id);

  //   return this.collaboratorService.cancelDemande(demandeId, user);
  // }

  // @Mutation(returns => Boolean)
  // async rejectDemandeByAdmin(
  //   @Args({ name: 'demandeId', type: () => ID })
  //   demandeId: string,
  //   @Args({ name: 'rejectedReason', type: () => String })
  //   rejectedReason: string,
  //   @CurrentUser() currentUser: IUser
  // ): Promise<boolean> {
  //   const user = await this.userService.getUserById(currentUser._id);

  //   return this.collaboratorService.rejectDemande(demandeId, user, rejectedReason);
  // }
}

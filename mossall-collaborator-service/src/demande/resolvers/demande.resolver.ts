import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { User } from '~/users/dto/user.entity';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import {
  DemandeMetric,
  DemandeMetricFilter,
} from '../dto/demande-metrics.entity';
import { Demande } from '../dto/demande.entity';
import { DemandeInput } from '../dto/demande.input';
import { DemandeUpdateInput } from '../dto/demande.update.input';
import { DemandeStatus } from '../enums/demande-status.enum';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { DemandeService } from '../services/demande.service';
import { AuthGuard } from '~/auth/auth.guard';
import { WaveFees } from '../demande.constant';

@UseGuards(AuthGuard)
@Resolver()
export class DemandeResolver {
  constructor(
    private demandeService: DemandeService,
    private userService: UserService,
  ) {}

  @Mutation((returns) => Demande)
  async addDemande(
    @Args({ name: 'demandeInput', type: () => DemandeInput })
    demandeInput: IDemande,
    @CurrentUser() currentUser: any,
  ): Promise<IDemande> {
    return this.demandeService.create(demandeInput, currentUser);
  }

  @Mutation((returns) => Boolean)
  async updateDemande(
    @Args({ name: 'demandeInput', type: () => DemandeUpdateInput })
    demandeInput: IDemande,
    @Args({ name: 'demandeId', type: () => ID }) demandeId: string,
    @CurrentUser() currentUser: IUser,
  ): Promise<boolean> {
    return this.demandeService.update(demandeId, demandeInput, currentUser);
  }

  @Mutation((returns) => Boolean)
  async cancelDemande(
    @Args({ name: 'demandeId', type: () => ID }) demandeId: string,
    @CurrentUser() currentUser: IUser,
  ): Promise<boolean> {
    return this.demandeService.cancel(demandeId, currentUser);
  }

  @Query((returns) => [DemandeMetric])
  async fetchMyDemandesMetrics(
    @Args({ name: 'metricsFilter', type: () => DemandeMetricFilter })
    metricsFilter: DemandeMetricFilter = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2030-12-31'),
    },
    @CurrentUser() currentUser: IUser,
  ): Promise<DemandeMetric[]> {
    return this.demandeService.getMyDemandesMetrics(
      metricsFilter,
      currentUser._id,
    );
  }

  @Query((returns) => Float)
  async checkMyDemandeFees(
    @Args({ name: 'demandeAmount', type: () => Float }) amount: number,
    @CurrentUser() currentUser: IUser,
  ): Promise<number> {
    return amount * WaveFees;
  }

  @Query((returns) => [Demande])
  fetchMyDemandes(@CurrentUser('_id') currentUser: IUser): Promise<IDemande[]> {
    return this.demandeService.findMany({ owner: currentUser._id });
  }

  @Query((returns) => Demande)
  fetchMyDemande(
    @Args({ name: 'demandeId', type: () => ID }) demandeId: string,
    @CurrentUser() currentUser: IUser,
  ): Promise<IDemande> {
    return this.demandeService.findOneOrFail({
      _id: demandeId,
      owner: currentUser._id,
    });
  }
}

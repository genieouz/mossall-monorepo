import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { CurrentOrganization } from '~/organization/decorators/current-organization.decorator';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { Demande, PaginatedDemandeResult } from '../dto/demande.entity';
import { DemandesMetrics } from '../dto/demandes-metrics.entity';
import { DemandesMetricsInput } from '../dto/demandes-metrics.input';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { DemandeService } from '../services/demande.service';
import { AuthGuard } from '~/auth/auth.guard';
import { IPagination } from '~/commons/graphql/pagination';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { ObjectId } from 'bson';
import { SupportPaiement } from '../dto/support.entity';

@UseGuards(AuthGuard)
@Resolver()
export class DemandeResolver {
  constructor(
    private demandeService: DemandeService,
    private userService: UserService,
  ) {}

  @Mutation((returns) => Boolean)
  async cancelDemandeByAdmin(
    @Args({ name: 'demandeId', type: () => ID })
    demandeId: string,
    // @AuthenticatedUser() currentUser: IUser
    @CurrentUser() user: IUser,
  ): Promise<boolean> {
    // const user = await this.userService.findById(currentUser._id);

    return this.demandeService.cancelByAdmin(demandeId, user);
  }

  @Mutation((returns) => Boolean)
  async rejectDemandeByAdmin(
    @Args({ name: 'demandeId', type: () => ID })
    demandeId: string,
    @Args({ name: 'rejectedReason', type: () => String })
    rejectedReason: string,
    @CurrentUser() user: IUser,
  ): Promise<boolean> {
    // const user = await this.userService.findById(currentUser._id);

    return this.demandeService.rejectByAdmin(demandeId, user, rejectedReason);
  }

  @Mutation((returns) => Boolean)
  async validateDemande(
    @Args({ name: 'demandeId', type: () => ID })
    demandeId: string,
    // @AuthenticatedUser() currentUser: IUser
    @CurrentUser() user: IUser,
  ): Promise<boolean> {
    // const user = await this.userService.findById(currentUser._id);
    return this.demandeService.validate(demandeId, user);
  }

  @Mutation((returns) => Boolean)
  async payeDemande(
    @Args({ name: 'demandeId', type: () => ID })
    demandeId: string,
    @CurrentUser() user: IUser,
  ): Promise<boolean> {
    // const user = await this.userService.findById(currentUser._id);

    return this.demandeService.paye(demandeId, user);
  }

  @Query((returns) => [Demande])
  async fetchOrganizationDemandes(
    @CurrentUser() currentUser: IUser,
    @Args({
      name: 'metricsInput',
      type: () => DemandesMetricsInput,
      nullable: true,
    })
    metricsInput: DemandesMetricsInput = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2030-12-31'),
    },
    @CurrentOrganization() org: IOrganization,
  ): Promise<IDemande[]> {
    // const user = await this.userService.findById(currentUser._id);
    let endDate = new Date(metricsInput.endDate);
    endDate.setDate(endDate.getDate() + 1);
    // console.log({ $gte: new Date(metricsInput.startDate), $lt: endDate })

    return (
      await this.demandeService.findMany({
        organization: org._id,
        createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate },
      })
    ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  @Query((returns) => PaginatedDemandeResult)
  async fetchPaginatedOrganizationDemandes(
    @CurrentUser() currentUser: IUser,
    @Args({
      name: 'metricsInput',
      type: () => DemandesMetricsInput,
      nullable: true,
    })
    metricsInput: DemandesMetricsInput = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2030-12-31'),
    },
    @CurrentOrganization() org: IOrganization,
    @Args({
      name: 'queryFilter',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryDataConfig: QueryDataConfigInput,
  ): Promise<IPagination<IDemande>> {
    // const user = await this.userService.findById(currentUser._id);
    let endDate = new Date(metricsInput.endDate);
    endDate.setDate(endDate.getDate() + 1);
    // console.log({ $gte: new Date(metricsInput.startDate), $lt: endDate })
    return this.demandeService.findManyAndPaginate(
      {
        organization: { $in: [new ObjectId(org._id), String(org._id)] },
        createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate },
      },
      queryDataConfig,
    );
  }

  @Query((returns) => DemandesMetrics)
  async fetchDemandesMetrics(
    @CurrentUser() user: IUser,
    @Args({ name: 'metricsInput', type: () => DemandesMetricsInput })
    demandesMetricsInput: DemandesMetricsInput,
    @CurrentOrganization() org: IOrganization,
  ) {
    // const admin = await this.userService.findById(user._id)

    return this.demandeService.getDemandesMetrics(org.id, demandesMetricsInput);
  }

  @Query((returns) => [SupportPaiement])
  async fetchSupportPaiement(@CurrentOrganization() org: IOrganization) {
    return this.demandeService.getSupportPaiement(org);
  }
}

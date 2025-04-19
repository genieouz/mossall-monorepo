import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  Args,
  Float,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { CurrentOrganization } from '~/organization/decorators/current-organization.decorator';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import {
  CountStatusDemande,
  Demande,
  PaginatedDemandeResult,
} from '../dto/demande.entity';
import {
  DemandesMetrics,
  DemandesTotalAmount,
} from '../dto/demandes-metrics.entity';
import { DemandesMetricsInput } from '../dto/demandes-metrics.input';
import { IDemande } from '../schemas/interfaces/demande.interface';
import { DemandeService } from '../services/demande.service';
import { AuthGuard } from '~/auth/auth.guard';
import { IPagination } from '~/commons/graphql/pagination';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { ObjectId } from 'bson';
import { SupportPaiement } from '../dto/support.entity';
import { OrderByInput } from '~/commons/graphql/order-by.input';
import { OrderByDirection } from '~/commons/graphql/enums/order-by-direction.enum';
import { DemandeStatus } from '../enums/demande-status.enum';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { normalizeQueryDataConfig } from '~/commons/utils';

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
    const queryFilter = {};
    // const user = await this.userService.findById(currentUser._id);
    let endDate = new Date(metricsInput.endDate);
    endDate.setDate(endDate.getDate() + 1);
    // console.log({ $gte: new Date(metricsInput.startDate), $lt: endDate })

    if (metricsInput.status) {
      queryFilter['status'] = metricsInput.status;
    }

    return (
      await this.demandeService.findMany({
        organization: org._id,
        createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate },
        ...queryFilter,
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
    @Args({
      name: 'organizationServiceId',
      type: () => String,
      nullable: true,
    })
    organizationServiceId?: string,
  ): Promise<IPagination<IDemande>> {
    queryDataConfig = normalizeQueryDataConfig(queryDataConfig);
    // const user = await this.userService.findById(currentUser._id);
    let endDate = new Date(metricsInput.endDate);
    endDate.setDate(endDate.getDate() + 1);

    const queryFilter: any = {
      organization: new ObjectId(org.id),
      createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate },
    };
    if (metricsInput.status) {
      queryFilter['status'] = metricsInput.status;
    }

    if (metricsInput.minimum != null) {
      queryFilter.amount = { $gte: metricsInput.minimum };
    }

    if (metricsInput.maximum != null) {
      queryFilter.amount = {
        $gte: metricsInput?.minimum ?? 0,
        $lte: metricsInput.maximum,
      };
    }

    queryDataConfig['orderBy'] = {
      property: 'createdAt',
      direction: OrderByDirection.DESC,
    };

    if (organizationServiceId) {
      queryFilter['organizationServiceId'] = new ObjectId(
        organizationServiceId,
      );
    }

    return this.demandeService.findManyAndPaginate(
      {
        ...queryFilter,
      },
      queryDataConfig,
    );
  }

  @Query((returns) => [Demande])
  async fetchDemandesByCollaborator(
    @Args({ name: 'collaboratorId', type: () => ID }) collaboratorId: string,
    @Args({ name: 'status', type: () => DemandeStatus, nullable: true })
    status: DemandeStatus,
  ) {
    return this.demandeService.findByCollaborator(collaboratorId, status);
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

  @Query((returns) => [Demande])
  async fetchSupportPaiement(@CurrentOrganization() org: IOrganization) {
    return this.demandeService.getSupportPaiement(org);
  }

  @Query((returns) => CountStatusDemande)
  async fetchCountStatus(
    @CurrentOrganization() organisation: IOrganization,
    @Args({ name: 'filter', type: () => DemandesMetricsInput, nullable: true })
    filter: DemandesMetricsInput,
  ) {
    const query = {
      organization: organisation.id,
    };

    if (filter?.startDate && filter?.endDate) {
      query['createdAt'] = {
        $gte: new Date(filter.startDate),
        $lte: new Date(filter.endDate),
      };
    }

    const [pending, validated, rejected, payed, cancelled] = await Promise.all([
      this.demandeService.count({
        status: DemandeStatus.PENDING,
        ...query,
      }),
      this.demandeService.count({
        status: DemandeStatus.VALIDATED,
        ...query,
      }),
      this.demandeService.count({
        status: DemandeStatus.REJECTED,
        ...query,
      }),
      this.demandeService.count({
        status: DemandeStatus.PAYED,
        ...query,
      }),
      this.demandeService.count({
        status: DemandeStatus.CANCELLED,
        ...query,
      }),
    ]);
    return {
      pending,
      validated,
      rejected,
      payed,
      cancelled,
    };
  }

  @Query((returns) => Float, { nullable: true })
  async fetchTotalDemandesAmount(
    @CurrentOrganization() org: IOrganization,
    @Args({ name: 'status', type: () => DemandeStatus, nullable: true })
    status: DemandeStatus,
    @Args({ name: 'filter', type: () => DemandesMetricsInput, nullable: true })
    filter: DemandesMetricsInput,
  ): Promise<number> {
    const match = {
      organization: new ObjectId(org.id),
    };

    if (status) {
      match['status'] = status;
    }

    if (filter?.startDate && filter?.endDate) {
      match['createdAt'] = {
        $gte: new Date(filter.startDate),
        $lte: new Date(filter.endDate),
      };
    }

    const result: any = await this.demandeService.aggregateOne([
      { $match: match },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    return result ? result.total : 0;
  }
}

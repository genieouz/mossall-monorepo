import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { CollaboratorsService } from '~/collaborators/collaborators.service';
import { DemandesMetricsInput } from '~/demande/dto/demandes-metrics.input';
import { PaginatedUserResult, User } from '~/users/dto/user.entity';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { CurrentOrganization } from '../decorators/current-organization.decorator';
import { Organization } from '../dto/organization.entity';
import { OrganizationInput } from '../dto/organization.input';
import { OrganizationUpdateInput } from '../dto/organization.update.input';
import { OrganizationType } from '../enums/organization-type.enum';
import { IOrganization } from '../schemas/interfaces/organization.interface';
import { OrganizationService } from '../services/organization.service';
import { AuthGuard } from '~/auth/auth.guard';
import { IPagination } from '~/commons/graphql/pagination';
import { UserRole } from '~/users/enums/user-role.enum';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { ObjectId } from 'mongodb';

@UseGuards(AuthGuard)
@Resolver()
export class OrganizationResolver {
  constructor(
    private organizationService: OrganizationService,
    private collaboratorService: CollaboratorsService,
    private userService: UserService,
  ) {}

  @Mutation((returns) => Organization)
  createOrganization(
    @Args({ name: 'organizationInput', type: () => OrganizationInput })
    organizationInput: IOrganization,
  ): Promise<IOrganization> {
    return this.organizationService.createOrganization(organizationInput);
  }

  @Mutation((returns) => Organization)
  createFinancialOrganization(
    @Args({ name: 'organizationInput', type: () => OrganizationInput })
    organizationInput: IOrganization,
  ): Promise<IOrganization> {
    return this.organizationService.createOrganization(
      organizationInput,
      OrganizationType.FINANCIAL,
    );
  }

  @Mutation((returns) => Boolean)
  updateOrganization(
    @Args({ name: 'organizationInput', type: () => OrganizationUpdateInput })
    organizationInput: IOrganization,
    @Args({ name: 'organizationId', type: () => ID }) organizationId: string,
  ): Promise<boolean> {
    return this.organizationService.updateOneById(
      organizationId,
      organizationInput,
    );
  }

  @Query((returns) => [Organization])
  fetchOrganizations(): Promise<IOrganization[]> {
    return this.organizationService.findMany({});
  }

  @Query((returns) => Organization)
  fetchOrganization(
    @Args({ name: 'organizationId', type: () => ID }) organizationId: string,
  ): Promise<IOrganization> {
    return this.organizationService.findOneByIdOrFail(organizationId);
  }

  @Query((returns) => [User])
  async fetchOrganizationCollaborators(
    // @AuthenticatedUser() currentUser: IUser,
    @Args({
      name: 'metricsInput',
      type: () => DemandesMetricsInput,
      nullable: true,
    })
    demandesMetricsInput: DemandesMetricsInput = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2030-12-31'),
    },
    @CurrentOrganization() org: IOrganization,
  ): Promise<any> {
    // console.log({org})
    // const user = await this.userService.getUserById(currentUser._id);
    return this.userService.fetchMyCollaborators(org._id, demandesMetricsInput);
  }

  @Query((returns) => PaginatedUserResult)
  async fetchPaginatedOrganisationCol(
    @Args({
      name: 'metricsInput',
      type: () => DemandesMetricsInput,
      nullable: true,
    })
    demandesMetricsInput: DemandesMetricsInput = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2030-12-31'),
    },
    @CurrentOrganization() org: IOrganization,
  ) {
    let endDate = new Date(demandesMetricsInput.endDate);
    endDate.setDate(endDate.getDate() + 1);
    return this.userService.findManyAndPaginate({
      role: UserRole.COLLABORATOR,
      organization: org.id,
      createdAt: {
        $gte: new Date(demandesMetricsInput.startDate),
        $lt: endDate,
      },
    });
  }

  @Query((returns) => PaginatedUserResult)
  async fetchPaginatedOrganizationCollaborators(
    // @AuthenticatedUser() currentUser: IUser,
    @Args({
      name: 'metricsInput',
      type: () => DemandesMetricsInput,
      nullable: true,
    })
    demandesMetricsInput: DemandesMetricsInput = {
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
      name: 'hasPendingDemandes',
      type: () => Boolean,
      nullable: true,
    })
    hasPendingDemandes: boolean,
  ): Promise<IPagination<IUser>> {
    let endDate = new Date(demandesMetricsInput.endDate);
    endDate.setDate(endDate.getDate() + 1);
    const queryFilter = {
      role: UserRole.COLLABORATOR,
      organization: { $in: [org._id, String(org._id)] },
      createdAt: {
        $gte: new Date(demandesMetricsInput.startDate),
        $lt: endDate,
      },
    };

    if (hasPendingDemandes) {
      return this.userService.fetchCollaboratorsThatHasPendingDemandes(
        queryDataConfig,
        queryFilter,
      );
    }

    return this.userService.findManyAndPaginate(queryFilter, queryDataConfig);
  }

  @Query((returns) => [User])
  async fetchOrganizationAdmins(
    // @AuthenticatedUser() currentUser: IUser,
    @CurrentOrganization() org: IOrganization,
  ): Promise<any> {
    // const user = await this.userService.getUserById(currentUser._id);
    return this.userService.fetchMyAdmins(org.id);
  }

  @Query((returns) => PaginatedUserResult)
  fetchPaginatedOrganisationAdmins(
    @Args({
      name: 'metricsInput',
      type: () => DemandesMetricsInput,
      nullable: true,
    })
    demandesMetricsInput: DemandesMetricsInput = {
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
  ) {
    let endDate = new Date(demandesMetricsInput.endDate);
    endDate.setDate(endDate.getDate() + 1);
    const queryFilter = {
      role: UserRole.ADMIN,
      organization: { $in: [org._id, String(org._id)] },
      createdAt: {
        $gte: new Date(demandesMetricsInput.startDate),
        $lt: endDate,
      },
    };
    return this.userService.findManyAndPaginate(queryFilter, queryDataConfig);
  }
}

import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import {
  OrganisationService,
  PaginatedOrganisationServiceResult,
} from '../dto/organisation-service.entity';
import { IOrganisationService } from '../schemas/interfaces/organisation-service.interface';
import { OrganisationServiceService } from '../services/organisation-service.service';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@Resolver()
export class OrganisationServiceResolver {
  constructor(private organisationServiceService: OrganisationServiceService) {}

  @Query((returns) => [OrganisationService])
  fetchAllOrganisationServices(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
    @CurrentUser() user: any,
  ): Promise<IOrganisationService[]> {
    console.log({ user });

    return this.organisationServiceService.findMany(
      {
        organizationId: user.organization,
        activated: true,
      },
      queryConfig,
    );
  }

  @Query((returns) => OrganisationService)
  fetchOrganisationService(
    @Args({ name: 'organisationServiceId', type: () => ID })
    organisationServiceId: string,
  ): Promise<IOrganisationService> {
    let _id: any = organisationServiceId;
    return this.organisationServiceService.findOneOrFail({ _id });
  }

  @Query((returns) => OrganisationService)
  fetchOrganisationServiceByOrganisationIdAndServiceId(
    @Args({ name: 'organisationId', type: () => ID })
    organisationId: string,
    @Args({ name: 'serviceId', type: () => ID })
    serviceId: string,
  ): Promise<IOrganisationService> {
    return this.organisationServiceService.findOneOrFail({
      organizationId: organisationId,
      serviceId,
    });
  }
}

import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import {
  OrganisationService,
  PaginatedOrganisationServiceResult,
} from '../dto/organisation-service.entity';
import { OrganisationServiceInput } from '../dto/organisation-service.input';
import { OrganisationServiceUpdateInput } from '../dto/organisation-service.update.input';
import { IOrganisationService } from '../schemas/interfaces/organisation-service.interface';
import { OrganisationServiceService } from '../services/organisation-service.service';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';
import { EventService } from '~/event/services/event.service';
import { OrganizationService } from '~/organization/services/organization.service';
import { ServiceService } from '~/service/services/service.service';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@Resolver()
export class OrganisationServiceResolver {
  constructor(
    private organisationServiceService: OrganisationServiceService,
    private organisationService: OrganizationService,
    private eventService: EventService,
    private serviceService: ServiceService,
  ) {}

  @Mutation((returns) => OrganisationService)
  async createOrganisationService(
    @Args({
      name: 'organisationServiceInput',
      type: () => OrganisationServiceInput,
    })
    organisationServiceInput: IOrganisationService,
    @Args({ name: 'organisationId', type: () => ID })
    organisationId: string,
    @Args({ name: 'serviceId', type: () => ID })
    serviceId: string,
  ): Promise<IOrganisationService> {
    const organization = await this.organisationService.findOneByIdOrFail(
      organisationId,
    );
    const service = await this.serviceService.findOneById(serviceId);

    const exists = await this.organisationServiceService.findOne({
      organizationId: organisationId,
      serviceId,
    });

    if (exists)
      throw new BadRequestException('Organisation service already exists');

    if (organisationServiceInput.refundDuration > service.refundDurationMonth)
      throw new BadRequestException(
        'Refund duration cannot be greater than service refund duration',
      );

    organisationServiceInput.organizationId = organisationId;
    organisationServiceInput.serviceId = serviceId;

    return this.organisationServiceService.insertOne(organisationServiceInput);
  }

  @Mutation((returns) => Boolean)
  updateOrganisationService(
    @Args({
      name: 'organisationServiceInput',
      type: () => OrganisationServiceUpdateInput,
    })
    organisationServiceInput: IOrganisationService,
    @Args({ name: 'organisationServiceId', type: () => ID })
    organisationServiceId: string,
  ): Promise<boolean> {
    return this.organisationServiceService.updateOneById(
      organisationServiceId,
      organisationServiceInput,
    );
  }

  @Query((returns) => PaginatedOrganisationServiceResult)
  fetchOrganisationServices(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
  ): Promise<any> {
    return this.organisationServiceService.findManyAndPaginate({}, queryConfig);
  }

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
    return this.organisationServiceService.findMany(
      {
        organizationId: user.organization,
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

  @Query((returns) => OrganisationService, { nullable: true })
  async fetchOrganisationServiceByOrganisationIdAndServiceId(
    @Args({ name: 'organisationId', type: () => ID })
    organisationId: string,
    @Args({ name: 'serviceId', type: () => ID })
    serviceId: string,
  ): Promise<IOrganisationService> {
    const result = await this.organisationServiceService.findOne({
      organizationId: organisationId,
      serviceId,
    });

    console.log(result);

    if (!result) return null;

    return result;
  }

  @Mutation((returns) => Boolean)
  deleteOrganisationService(
    @Args({ name: 'organisationServiceId', type: () => ID })
    organisationServiceId: string,
  ): Promise<boolean> {
    let _id: any = organisationServiceId;
    return this.organisationServiceService.deleteOne({ _id });
  }

  @Mutation((returns) => Boolean)
  activateOrganisationService(
    @Args({ name: 'organisationServiceId', type: () => ID })
    organisationServiceId: string,
  ): Promise<boolean> {
    let _id: any = organisationServiceId;
    return this.organisationServiceService.updateOne(
      { _id },
      { activated: true, activatedAt: new Date() },
    );
  }

  @Mutation((returns) => Boolean)
  deactivateOrganisationService(
    @Args({ name: 'organisationServiceId', type: () => ID })
    organisationServiceId: string,
  ): Promise<boolean> {
    let _id: any = organisationServiceId;
    return this.organisationServiceService.updateOne(
      { _id },
      { activated: false },
    );
  }
}

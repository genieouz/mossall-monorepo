import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { Service, PaginatedServiceResult } from '../dto/service.entity';
import { ServiceInput } from '../dto/service.input';
import { ServiceUpdateInput } from '../dto/service.update.input';
import { IService } from '../schemas/interfaces/service.interface';
import { ServiceService } from '../services/service.service';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver()
export class ServiceResolver {
  constructor(private serviceService: ServiceService) {}

  @Mutation((returns) => Service)
  createService(
    @Args({ name: 'serviceInput', type: () => ServiceInput })
    serviceInput: IService,
  ): Promise<IService> {
    return this.serviceService.insertOne(serviceInput);
  }

  @Mutation((returns) => Boolean)
  updateService(
    @Args({ name: 'serviceInput', type: () => ServiceUpdateInput })
    serviceInput: IService,
    @Args({ name: 'serviceId', type: () => ID }) serviceId: string,
  ): Promise<boolean> {
    return this.serviceService.updateOneById(serviceId, serviceInput);
  }

  @Query((returns) => PaginatedServiceResult)
  fetchServices(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
  ): Promise<any> {
    return this.serviceService.findManyAndPaginate({}, queryConfig);
  }

  @Query((returns) => [Service])
  fetchAllServices(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
  ): Promise<IService[]> {
    return this.serviceService.findMany({}, queryConfig);
  }

  @Query((returns) => Service)
  fetchService(
    @Args({ name: 'serviceId', type: () => ID }) serviceId: string,
  ): Promise<IService> {
    let _id: any = serviceId;
    return this.serviceService.findOneOrFail({ _id });
  }

  @Mutation((returns) => Boolean)
  deleteService(
    @Args({ name: 'serviceId', type: () => ID }) serviceId: string,
  ): Promise<boolean> {
    let _id: any = serviceId;
    return this.serviceService.deleteOne({ _id });
  }

  @Mutation((returns) => Boolean)
  activateService(
    @Args({ name: 'serviceId', type: () => ID }) serviceId: string,
  ): Promise<boolean> {
    let _id: any = serviceId;
    return this.serviceService.updateOne(
      { _id },
      { available: true, publishedAt: new Date() },
    );
  }

  @Mutation((returns) => Boolean)
  deactivateService(
    @Args({ name: 'serviceId', type: () => ID }) serviceId: string,
  ): Promise<boolean> {
    let _id: any = serviceId;
    return this.serviceService.updateOne({ _id }, { available: false });
  }
}

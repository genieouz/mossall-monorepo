import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { Service, PaginatedServiceResult } from '../dto/service.entity';
import { IService } from '../schemas/interfaces/service.interface';
import { ServiceService } from '../services/service.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver()
export class ServiceResolver {
  constructor(private serviceService: ServiceService) {}

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
}

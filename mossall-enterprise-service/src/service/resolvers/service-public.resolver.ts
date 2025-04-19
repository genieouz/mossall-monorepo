import { Args, Query, Resolver } from '@nestjs/graphql';
import { ServiceService } from '../services/service.service';
import { Service, PaginatedServiceResult } from '../dto/service.entity';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { IService } from '../schemas/interfaces/service.interface';

@Resolver()
export class ServicePublicResolver {
  constructor(private serviceService: ServiceService) {}

  @Query((returns) => PaginatedServiceResult)
  fetchServicesPub(
    @Args({
      name: 'queryConfig',
      type: () => QueryDataConfigInput,
      nullable: true,
    })
    queryConfig: QueryDataConfigInput,
  ): Promise<any> {
    return this.serviceService.findManyAndPaginate({}, queryConfig);
  }

  @Query((returns) => Service)
  fetchServicePub(
    @Args({ name: 'serviceId', type: () => String }) serviceId: string,
  ): Promise<IService> {
    let _id: any = serviceId;
    return this.serviceService.findOneOrFail({ _id });
  }
}

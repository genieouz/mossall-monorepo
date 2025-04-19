import { ServiceService } from '../services/service.service';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { IService } from '../schemas/interfaces/service.interface';
export declare class ServicePublicResolver {
    private serviceService;
    constructor(serviceService: ServiceService);
    fetchServicesPub(queryConfig: QueryDataConfigInput): Promise<any>;
    fetchServicePub(serviceId: string): Promise<IService>;
}

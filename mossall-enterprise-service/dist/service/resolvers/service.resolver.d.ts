import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { IService } from '../schemas/interfaces/service.interface';
import { ServiceService } from '../services/service.service';
export declare class ServiceResolver {
    private serviceService;
    constructor(serviceService: ServiceService);
    createService(serviceInput: IService): Promise<IService>;
    updateService(serviceInput: IService, serviceId: string): Promise<boolean>;
    fetchServices(queryConfig: QueryDataConfigInput): Promise<any>;
    fetchAllServices(queryConfig: QueryDataConfigInput): Promise<IService[]>;
    fetchService(serviceId: string): Promise<IService>;
    deleteService(serviceId: string): Promise<boolean>;
    activateService(serviceId: string): Promise<boolean>;
    deactivateService(serviceId: string): Promise<boolean>;
}

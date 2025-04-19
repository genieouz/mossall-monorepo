import { IPaginatedResult } from '~/commons/abstract/paginated-result';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { ICategorySocioproService } from '../schemas/interfaces/category-sociopro-service.interface';
import { CategorySocioproServiceService } from '../services/category-sociopro-service.service';
import { CategorySocioproService } from '~/category-sociopro/services/category-sociopro.service';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { EventService } from '~/event/services/event.service';
export declare class CategorySocioproServiceResolver {
    private categorySocioproServiceService;
    private categorySocioproService;
    private organisationServiceService;
    private eventService;
    constructor(categorySocioproServiceService: CategorySocioproServiceService, categorySocioproService: CategorySocioproService, organisationServiceService: OrganisationServiceService, eventService: EventService);
    createCategorySocioproService(categorySocioproServiceInput: ICategorySocioproService, categorySocioproId: string, organisationServiceId: string, eventId: string): Promise<ICategorySocioproService>;
    updateCategorySocioproService(categorySocioproServiceInput: ICategorySocioproService, categorySocioproServiceId: string): Promise<boolean>;
    fetchCategorySocioproServices(queryConfig: QueryDataConfigInput): Promise<IPaginatedResult<ICategorySocioproService>>;
    fetchAllCategorySocioproServices(queryConfig: QueryDataConfigInput, organisationServiceId: string): Promise<ICategorySocioproService[]>;
    fetchCategorySocioproService(categorySocioproServiceId: string): Promise<ICategorySocioproService>;
    deleteCategorySocioproService(categorySocioproServiceId: string): Promise<boolean>;
    activateCategorySocioproService(categorySocioproServiceId: string): Promise<boolean>;
    deactivateCategorySocioproService(categorySocioproServiceId: string): Promise<boolean>;
}

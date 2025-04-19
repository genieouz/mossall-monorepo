import { IPaginatedResult } from '~/commons/abstract/paginated-result';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { ICategorySociopro } from '../schemas/interfaces/category-sociopro.interface';
import { CategorySocioproService } from '../services/category-sociopro.service';
import { OrganizationService } from '~/organization/services/organization.service';
import { UserService } from '~/users/user.service';
import { CategorySocioproServiceService } from '~/category-sociopro-service/services/category-sociopro-service.service';
export declare class CategorySocioproResolver {
    private categorySocioproService;
    private categorySocioproServiceService;
    private organizationService;
    private collaboratorService;
    constructor(categorySocioproService: CategorySocioproService, categorySocioproServiceService: CategorySocioproServiceService, organizationService: OrganizationService, collaboratorService: UserService);
    createCategorySociopro(categorySocioproInput: ICategorySociopro, organizationId: string): Promise<ICategorySociopro>;
    updateCategorySociopro(categorySocioproInput: ICategorySociopro, categorySocioproId: string): Promise<boolean>;
    fetchCategorySociopros(queryConfig: QueryDataConfigInput, user: any): Promise<IPaginatedResult<ICategorySociopro>>;
    fetchAllCategorySociopros(queryConfig: QueryDataConfigInput, user: any): Promise<ICategorySociopro[]>;
    fetchCategorySociopro(categorySocioproId: string): Promise<ICategorySociopro>;
    deleteCategorySociopro(categorySocioproId: string): Promise<boolean>;
    activateCategorySociopro(categorySocioproId: string, activatedAt: Date): Promise<boolean>;
    deactivateCategorySociopro(categorySocioproId: string): Promise<boolean>;
}

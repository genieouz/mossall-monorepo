import { ICategorySociopro } from '../schemas/interfaces/category-sociopro.interface';
import { OrganizationService } from '~/organization/services/organization.service';
export declare class CategorySocioproPropertyResolver {
    private readonly organisationService;
    constructor(organisationService: OrganizationService);
    organisation(categorySociopro: ICategorySociopro): Promise<import("../../organization/schemas/interfaces/organization.interface").IOrganization & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}

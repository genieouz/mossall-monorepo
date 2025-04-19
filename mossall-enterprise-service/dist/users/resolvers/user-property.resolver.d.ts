import { DemandeService } from '~/demande/services/demande.service';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { OrganizationService } from '~/organization/services/organization.service';
import { IUser } from '../schemas/interfaces/user.interface';
import { CategorySocioproService } from '~/category-sociopro/services/category-sociopro.service';
import { ICategorySociopro } from '~/category-sociopro/schemas/interfaces/category-sociopro.interface';
export declare class UserPropertyResolver {
    private readonly demandeService;
    private organizationService;
    private categorySocioProService;
    constructor(demandeService: DemandeService, organizationService: OrganizationService, categorySocioProService: CategorySocioproService);
    authorizedAdvance(user: IUser): Promise<number>;
    totalDemandeAmount(user: IUser): Promise<number>;
    balance(user: IUser): Promise<number>;
    organization(user: IUser, organization: IOrganization): Promise<IOrganization>;
    categorySociopro(user: IUser): Promise<ICategorySociopro>;
}

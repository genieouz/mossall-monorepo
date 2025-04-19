import { DemandeService } from '~/demande/services/demande.service';
import { IUser } from '../schemas/interfaces/user.interface';
import { IOrganization } from '~/organization/schemas/interfaces/organization.interface';
import { OrganizationService } from '~/organization/services/organization.service';
export declare class UserPropertyResolver {
    private demandeService;
    private organizationService;
    constructor(demandeService: DemandeService, organizationService: OrganizationService);
    balance(user: IUser): Promise<number>;
    organization(user: IUser, organization: IOrganization): Promise<IOrganization>;
}

import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { IOrganization } from '../schemas/interfaces/organization.interface';
export declare class OrganizationPropertyResolver {
    private organisationServiceService;
    constructor(organisationServiceService: OrganisationServiceService);
    organisationService(organization: IOrganization): Promise<import("../../organisation-service/schemas/interfaces/organisation-service.interface").IOrganisationService[]>;
}

import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { IOrganisationService } from '../schemas/interfaces/organisation-service.interface';
import { OrganisationServiceService } from '../services/organisation-service.service';
import { EventService } from '~/event/services/event.service';
import { OrganizationService } from '~/organization/services/organization.service';
import { ServiceService } from '~/service/services/service.service';
export declare class OrganisationServiceResolver {
    private organisationServiceService;
    private organisationService;
    private eventService;
    private serviceService;
    constructor(organisationServiceService: OrganisationServiceService, organisationService: OrganizationService, eventService: EventService, serviceService: ServiceService);
    createOrganisationService(organisationServiceInput: IOrganisationService, organisationId: string, serviceId: string): Promise<IOrganisationService>;
    updateOrganisationService(organisationServiceInput: IOrganisationService, organisationServiceId: string): Promise<boolean>;
    fetchOrganisationServices(queryConfig: QueryDataConfigInput): Promise<any>;
    fetchAllOrganisationServices(queryConfig: QueryDataConfigInput, user: any): Promise<IOrganisationService[]>;
    fetchOrganisationService(organisationServiceId: string): Promise<IOrganisationService>;
    fetchOrganisationServiceByOrganisationIdAndServiceId(organisationId: string, serviceId: string): Promise<IOrganisationService>;
    deleteOrganisationService(organisationServiceId: string): Promise<boolean>;
    activateOrganisationService(organisationServiceId: string): Promise<boolean>;
    deactivateOrganisationService(organisationServiceId: string): Promise<boolean>;
}

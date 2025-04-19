import { IOrganisationService } from '../schemas/interfaces/organisation-service.interface';
import { OrganizationService } from '~/organization/services/organization.service';
import { EventService } from '~/event/services/event.service';
import { ServiceService } from '~/service/services/service.service';
import { DemandeService } from '~/demande/services/demande.service';
import { CategorySocioproServiceService } from '~/category-sociopro-service/services/category-sociopro-service.service';
export declare class OrganizationServicePropertyResolver {
    private organizationService;
    private eventService;
    private serviceService;
    private categorySocioproService;
    private demandeService;
    constructor(organizationService: OrganizationService, eventService: EventService, serviceService: ServiceService, categorySocioproService: CategorySocioproServiceService, demandeService: DemandeService);
    organization(_organizationService: IOrganisationService): Promise<import("../../organization/schemas/interfaces/organization.interface").IOrganization & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    service(_organizationService: IOrganisationService): Promise<import("../../service/schemas/interfaces/service.interface").IService & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    events(_organizationService: IOrganisationService): Promise<import("../../event/schemas/interfaces/event.interface").IEvent[]>;
    categoriesocioproservices(_organizationService: IOrganisationService): Promise<import("../../category-sociopro-service/schemas/interfaces/category-sociopro-service.interface").ICategorySocioproService[]>;
    demandes(_organizationService: IOrganisationService): Promise<import("../../demande/schemas/interfaces/demande.interface").IDemande[]>;
}

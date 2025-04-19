import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { IEvent } from '../schemas/interfaces/event.interface';
import { CategorySocioproServiceService } from '~/category-sociopro-service/services/category-sociopro-service.service';
export declare class EventPropertyResolver {
    private readonly organisationServiceService;
    private readonly categorySocioproServiceService;
    constructor(organisationServiceService: OrganisationServiceService, categorySocioproServiceService: CategorySocioproServiceService);
    organisationService(event: IEvent): Promise<import("../../organisation-service/schemas/interfaces/organisation-service.interface").IOrganisationService & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    categorySocioproServices(event: IEvent): Promise<import("../../category-sociopro-service/schemas/interfaces/category-sociopro-service.interface").ICategorySocioproService[]>;
}

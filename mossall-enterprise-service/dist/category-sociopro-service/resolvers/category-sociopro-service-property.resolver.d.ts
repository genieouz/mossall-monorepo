import { CategorySocioproService as CategorySocioproServiceEntity } from '../dto/category-sociopro-service.entity';
import { CategorySocioproService } from '~/category-sociopro/services/category-sociopro.service';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { EventService } from '~/event/services/event.service';
export declare class CategorySocioproServicePropertyResolver {
    private readonly categorySocioproService;
    private readonly organisationServiceService;
    private readonly eventService;
    constructor(categorySocioproService: CategorySocioproService, organisationServiceService: OrganisationServiceService, eventService: EventService);
    categorySociopro(categorySocioproService: CategorySocioproServiceEntity): Promise<import("../../category-sociopro/schemas/interfaces/category-sociopro.interface").ICategorySociopro & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    organisationService(categorySocioproService: CategorySocioproServiceEntity): Promise<import("../../organisation-service/schemas/interfaces/organisation-service.interface").IOrganisationService & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    event(categorySocioproService: CategorySocioproServiceEntity): Promise<import("../../event/schemas/interfaces/event.interface").IEvent & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}

import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { IEvent } from '../schemas/interfaces/event.interface';
import { EventService } from '../services/event.service';
import { IPaginatedResult } from '~/commons/abstract/paginated-result';
import { OrganisationServiceService } from '~/organisation-service/services/organisation-service.service';
import { ServiceService } from '~/service/services/service.service';
export declare class EventResolver {
    private eventService;
    private organisationServiceService;
    private serviceService;
    constructor(eventService: EventService, organisationServiceService: OrganisationServiceService, serviceService: ServiceService);
    createEvent(eventInput: IEvent, organizationServiceId: string): Promise<IEvent>;
    updateEvent(eventInput: IEvent, eventId: string): Promise<boolean>;
    fetchEvents(queryConfig: QueryDataConfigInput, organizationServiceId: string): Promise<IPaginatedResult<IEvent>>;
    fetchAllEvents(queryConfig: QueryDataConfigInput, organizationServiceId: string): Promise<IEvent[]>;
    fetchEvent(eventId: string): Promise<IEvent>;
    deleteEvent(eventId: string): Promise<boolean>;
    activateEvent(eventId: string): Promise<boolean>;
    deactivateEvent(eventId: string): Promise<boolean>;
}

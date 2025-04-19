import { OrganizationService } from './services/organization.service';
export declare class OrganizationController {
    private organizationService;
    constructor(organizationService: OrganizationService);
    fetchOrganizationById(id: string): Promise<{
        id: any;
        _id: unknown;
    }>;
}

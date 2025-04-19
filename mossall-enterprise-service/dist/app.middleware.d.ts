import { NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { OrganizationService } from './organization/services/organization.service';
import { UserService } from './users/user.service';
export declare class AppMiddleware implements NestMiddleware {
    private readonly userService;
    private readonly organizationService;
    constructor(userService: UserService, organizationService: OrganizationService);
    use(req: any, res: Response, next: Function): Promise<void>;
}

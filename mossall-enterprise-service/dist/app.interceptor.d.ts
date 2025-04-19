import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrganizationService } from './organization/services/organization.service';
import { UserService } from './users/user.service';
export declare class AppInterceptor implements NestInterceptor {
    private userService;
    private organizationService;
    constructor(userService: UserService, organizationService: OrganizationService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private addCustomDataToRequest;
}

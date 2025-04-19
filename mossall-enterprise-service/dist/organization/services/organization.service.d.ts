import { Model } from 'mongoose';
import { AuthService } from '~/auth/auth.service';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { OrganizationInput } from '../dto/organization.input';
import { IOrganization } from '../schemas/interfaces/organization.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from '~/users/user.service';
import { OrganizationType } from '../enums/organization-type.enum';
export declare class OrganizationService extends AbstractService<IOrganization> {
    private model;
    private eventEmitter;
    private readonly userSerive;
    private authService;
    constructor(model: Model<IOrganization>, eventEmitter: EventEmitter2, userSerive: UserService, authService: AuthService);
    createOrganization(payload: OrganizationInput, type?: OrganizationType): Promise<IOrganization>;
    getOrganization: any;
}

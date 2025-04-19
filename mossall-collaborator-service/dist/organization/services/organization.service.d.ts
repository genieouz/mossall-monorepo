import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { UserService } from '~/users/user.service';
import { IOrganization } from '../schemas/interfaces/organization.interface';
export declare class OrganizationService extends AbstractService<IOrganization> {
    private eventEmitter;
    private readonly userSerive;
    constructor(model: Model<IOrganization>, eventEmitter: EventEmitter2, userSerive: UserService);
}

import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { INotification } from '../schemas/interfaces/notification.interface';
import { PaginationInfo } from '~/commons/graphql/pagination';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
export declare class NotificationService extends AbstractService<INotification> {
    private eventEmitter2;
    constructor(model: Model<INotification>, eventEmitter2: EventEmitter2);
    create(notificationInput: INotification): Promise<INotification>;
    findManyNotificationsAndPaginate(user: any, queryConfig?: QueryDataConfigInput): Promise<{
        results: any[];
        pagination: PaginationInfo;
    }>;
}

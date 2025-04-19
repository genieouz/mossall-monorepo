import { IUser } from '~/users/schemas/interfaces/user.interface';
import { UserService } from '~/users/user.service';
import { NotificationService } from '../services/notification.service';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { DemandesMetricsInput } from '~/demande/dto/demandes-metrics.input';
export declare class NotificationResolver {
    private notificationService;
    private userService;
    constructor(notificationService: NotificationService, userService: UserService);
    fetchOrganizationNotifications(user: IUser): Promise<unknown[]>;
    viewOrganizationNotifications(user: IUser): Promise<boolean>;
    fetchPaginatedNotifications(user: IUser, queryDataConfig: QueryDataConfigInput, metricsInput?: DemandesMetricsInput): Promise<{
        results: any[];
        pagination: import("../../commons/graphql/pagination").PaginationInfo;
    }>;
}

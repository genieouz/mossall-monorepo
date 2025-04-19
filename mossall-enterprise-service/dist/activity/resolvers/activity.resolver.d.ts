import { IPagination } from '~/commons/graphql/pagination';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';
import { IUser } from '~/users/schemas/interfaces/user.interface';
import { IActivity } from '../schemas/interfaces/activity.interface';
import { Activitieservice } from '../services/activity.service';
export declare class ActivityResolver {
    private activitieservice;
    constructor(activitieservice: Activitieservice);
    fetchPaginatedActivities(queryDataConfig: QueryDataConfigInput, user: IUser): Promise<IPagination<IActivity>>;
    fetchActivity(activityId: string): Promise<IActivity>;
}

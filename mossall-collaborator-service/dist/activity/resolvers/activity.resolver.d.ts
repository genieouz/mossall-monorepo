import { IActivity } from '../schemas/interfaces/activity.interface';
import { Activitieservice } from '../services/activity.service';
export declare class ActivityResolver {
    private activitieservice;
    constructor(activitieservice: Activitieservice);
    createActivity(activityInput: IActivity): Promise<IActivity>;
    updateActivity(activityInput: IActivity, activityId: string): Promise<boolean>;
    fetchActivities(): Promise<IActivity[]>;
    fetchActivity(activityId: string): Promise<IActivity>;
}

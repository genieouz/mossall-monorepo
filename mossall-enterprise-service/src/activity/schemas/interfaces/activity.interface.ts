import { Document } from 'mongoose';
import { ActivityScope } from '~/activity/enums/activity-scope.enum';

export interface IActivity extends Document {
    message: string;
    initialValue?: any,
    currentValue?: any,
    meta?: any;
    user: string;
    scope: ActivityScope;
    organization: string;
}

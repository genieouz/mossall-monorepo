import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { IUser } from '~/users/schemas/interfaces/user.interface';
export declare class Notification extends Timestamps {
    entityId: string;
    title: string;
    content: string;
    author: IUser;
    organization: string;
    viewedByMe: boolean;
}
declare const PaginatedNotificationResult_base: any;
export declare class PaginatedNotificationResult extends PaginatedNotificationResult_base {
}
export {};

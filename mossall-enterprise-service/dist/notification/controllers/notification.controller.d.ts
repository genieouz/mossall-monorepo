import { INotification } from '../schemas/interfaces/notification.interface';
import { NotificationService } from '../services/notification.service';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    createNotification(notificationInput: INotification): Promise<INotification>;
    fetchNotifications(): Promise<INotification[]>;
}

import { HttpService } from '@nestjs/axios';
import { INotification } from '../schemas/interfaces/notification.interface';
export declare class NotificationService {
    private readonly http;
    endPoint: string;
    constructor(http: HttpService);
    createNotifictation(payload: INotification): Promise<import("axios").AxiosResponse<any, any>>;
}

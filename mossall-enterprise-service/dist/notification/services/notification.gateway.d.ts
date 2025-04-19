import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { INotification } from '../schemas/interfaces/notification.interface';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    emitNotification(notification: INotification): void;
    handleNotify(client: any, payload: any): void;
}

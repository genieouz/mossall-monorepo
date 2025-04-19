import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { INotification } from '../schemas/interfaces/notification.interface';

@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @OnEvent('notification.emit')
  emitNotification(notification: INotification) {
    this.server.emit('notification', notification);
  }
  @SubscribeMessage('notify')
  handleNotify(client: any, payload: any): void {
    this.server.emit('notification', payload); // Emit to all clients
  }
}


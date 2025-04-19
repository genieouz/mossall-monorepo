import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { lastValueFrom } from 'rxjs';
import { ENTERPRISE_SERVICE } from '~/config/env';
import { INotification } from '../schemas/interfaces/notification.interface';

@Injectable()
export class NotificationService {
  endPoint = `${ENTERPRISE_SERVICE}/notification`;

  constructor(
    private readonly http: HttpService
  ) {}

  @OnEvent('notification.create')
  createNotifictation(payload: INotification) {
    return lastValueFrom(this.http.post(this.endPoint, payload));
  }
}


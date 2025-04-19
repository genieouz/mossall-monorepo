import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { INotification } from '../schemas/interfaces/notification.interface';
import { notificationModelName } from '../schemas/notification.model-name';

@Injectable()
export class NotificationService extends AbstractService<INotification> {
  constructor(
    @InjectModel(notificationModelName) model: Model<INotification>,
    private eventEmitter2: EventEmitter2
  ) {
    super(model);
  }

  async create(
    notificationInput: INotification,
  ): Promise<INotification> {
    const notification = await this.insertOne(notificationInput);
    this.eventEmitter2.emit('notification.emit', notification);
    return notification;
  }
}


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IEvent } from '../schemas/interfaces/event.interface';
import { eventModelName } from '../schemas/event.model-name';

@Injectable()
export class EventService extends AbstractService<IEvent> {
  constructor(@InjectModel(eventModelName) model: Model<IEvent>) {
    super(model, ['title', 'description']);
  }
}

import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IEvent } from '../schemas/interfaces/event.interface';
export declare class EventService extends AbstractService<IEvent> {
    constructor(model: Model<IEvent>);
}

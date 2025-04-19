import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IService } from '../schemas/interfaces/service.interface';
export declare class ServiceService extends AbstractService<IService> {
    constructor(model: Model<IService>);
}

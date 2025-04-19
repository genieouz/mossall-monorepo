import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { ICategorySocioproService } from '../schemas/interfaces/category-sociopro-service.interface';
export declare class CategorySocioproServiceService extends AbstractService<ICategorySocioproService> {
    constructor(model: Model<ICategorySocioproService>);
}

import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { ICategorySociopro } from '../schemas/interfaces/category-sociopro.interface';
export declare class CategorySocioproService extends AbstractService<ICategorySociopro> {
    constructor(model: Model<ICategorySociopro>);
}

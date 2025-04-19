import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { ICategorySocioproService } from '../schemas/interfaces/category-sociopro-service.interface';
import { categorySocioproServiceModelName } from '../schemas/category-sociopro-service.model-name';

@Injectable()
export class CategorySocioproServiceService extends AbstractService<ICategorySocioproService> {
  constructor(@InjectModel(categorySocioproServiceModelName) model: Model<ICategorySocioproService>) {
    super(model, ['title', 'description', 'content']);
  }
}


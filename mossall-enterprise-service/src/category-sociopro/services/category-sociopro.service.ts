import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { ICategorySociopro } from '../schemas/interfaces/category-sociopro.interface';
import { categorySocioproModelName } from '../schemas/category-sociopro.model-name';

@Injectable()
export class CategorySocioproService extends AbstractService<ICategorySociopro> {
  constructor(
    @InjectModel(categorySocioproModelName) model: Model<ICategorySociopro>,
  ) {
    super(model, ['title', 'description']);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IService } from '../schemas/interfaces/service.interface';
import { serviceModelName } from '../schemas/service.model-name';

@Injectable()
export class ServiceService extends AbstractService<IService> {
  constructor(@InjectModel(serviceModelName) model: Model<IService>) {
    super(model, ['title', 'description']);
  }
}

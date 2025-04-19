import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { ITokenAcknowledgment } from '../schemas/interfaces/token-acknowledgment.interface';
import { tokenAcknowledgmentModelName } from '../schemas/token-acknowledgment.model-name';

@Injectable()
export class TokenAcknowledgmentService extends AbstractService<ITokenAcknowledgment> {
  constructor(@InjectModel(tokenAcknowledgmentModelName) model: Model<ITokenAcknowledgment>) {
    super(model);
  }
}


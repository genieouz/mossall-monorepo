import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { ITokenAcknowledgment } from '../schemas/interfaces/token-acknowledgment.interface';
export declare class TokenAcknowledgmentService extends AbstractService<ITokenAcknowledgment> {
    constructor(model: Model<ITokenAcknowledgment>);
}

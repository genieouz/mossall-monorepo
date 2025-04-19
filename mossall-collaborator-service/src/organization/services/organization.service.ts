import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { UserService } from '~/users/user.service';
import { IOrganization } from '../schemas/interfaces/organization.interface';
import { organizationModelName } from '../schemas/organization.model-name';

@Injectable()
export class OrganizationService extends AbstractService<IOrganization> {
  constructor(
    @InjectModel(organizationModelName) model: Model<IOrganization>,
    private eventEmitter: EventEmitter2,
    private readonly userSerive: UserService
  ) {
    super(model);
  }
}

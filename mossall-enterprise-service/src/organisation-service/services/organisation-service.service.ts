import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IOrganisationService } from '../schemas/interfaces/organisation-service.interface';
import { organisationServiceModelName } from '../schemas/organisation-service.model-name';

@Injectable()
export class OrganisationServiceService extends AbstractService<IOrganisationService> {
  constructor(@InjectModel(organisationServiceModelName) model: Model<IOrganisationService>) {
    super(model, ['title', 'description', 'content']);
  }
}


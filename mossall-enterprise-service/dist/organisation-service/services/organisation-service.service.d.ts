import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { IOrganisationService } from '../schemas/interfaces/organisation-service.interface';
export declare class OrganisationServiceService extends AbstractService<IOrganisationService> {
    constructor(model: Model<IOrganisationService>);
}

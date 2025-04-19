import { Document } from 'mongoose';
import { AmountUnit, DurationUnit } from '~/commons/enum';

export interface IOrganisationService extends Document {
  amount: number;
  amountUnit: AmountUnit;

  refundDuration: number;
  refundDurationUnit: DurationUnit;

  activated: boolean;
  activatedAt: Date;
  activationDurationDay: number;

  autoValidate: boolean;

  organizationId: string;
  serviceId: string;
}

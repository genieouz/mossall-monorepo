import { Document } from 'mongoose';
import { AmountUnit, DurationUnit } from '~/commons/enum';

export interface ICategorySocioproService extends Document {
  amount: number;
  amountUnit: AmountUnit;

  refundDuration: number;
  refundDurationUnit: DurationUnit;

  activated: boolean;
  activatedAt: Date;

  autoValidate: boolean;

  organisationServiceId: string;
  categorySocioproId: string;
}

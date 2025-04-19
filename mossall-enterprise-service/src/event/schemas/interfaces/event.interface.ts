import { Document } from 'mongoose';
import { AmountUnit, DurationUnit } from '~/commons/enum';

export interface IEvent extends Document {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;

  amount: number;
  amountUnit: AmountUnit;

  refundDuration: number;
  refundDurationUnit: DurationUnit;

  activated: boolean;
  activatedAt: Date;

  autoValidate: boolean;

  organizationServiceId?: string;
  addedBy?: string;
}

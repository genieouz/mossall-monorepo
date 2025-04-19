import { Document } from 'mongoose';
import { AmountUnit, DurationUnit } from '~/commons/enum';

export interface ICategorySociopro extends Document {
  title: string;
  description: string;

  activated: boolean;
  activatedAt: Date;

  organizationId: string;
  addedBy?: string;
}

import { Schema } from 'mongoose';
import { defaultSchemaOptions } from '~/commons/mongoose/schemas';

const customerSchema = new Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bank_name: { type: String, required: false },
  bank_id: { type: String, required: false },
  bank_account_name: { type: String, required: false }
});

export const paymentSchema = new Schema({
  business: { type: String, required: false },
  customer: { type: customerSchema, required: true },
  slug: { type: String, required: false },
  reference: { type: String, required: true },
  kind: { type: String, required: false },
  network: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  expired_at: { type: Date, required: false },
  meta: { type: Schema.Types.Mixed }
}, defaultSchemaOptions);

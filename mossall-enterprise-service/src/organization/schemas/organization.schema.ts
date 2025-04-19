import { model, Schema } from 'mongoose';

export const organizationSchema = new Schema({
  name: { type: String, required: true },
  rootEmail: { type: String, required: true },
  rootUser: { type: String, required: true },
  maxDemandeAmount: { type: Number, default: 0 },
  amountPercent: { type: Number, default: 75 },
  fees: { type: Number, default: 0 },
  demandeDeadlineDay: { type: Number, default: 15 },
});

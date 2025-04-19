import { Schema } from 'mongoose';
import { defaultSchemaOptions } from '~/commons/mongoose/schemas';
import { DemandeStatus } from '../enums/demande-status.enum';

export const demandeSchema = new Schema(
  {
    amount: { type: Number, default: 0, required: true },
    status: { type: String, default: DemandeStatus.PENDING, required: true },
    organization: { type: Schema.Types.ObjectId, required: true },
    owner: { type: Schema.Types.ObjectId, required: true },
    fees: { type: Number, default: 0 },
    createdAtMonth: { type: Number },
    createdAtYear: { type: Number },
    validatedAt: { type: Date },
    validatedAtMonth: { type: Number },
    validatedAtYear: { type: Number },
    rejectedReason: { type: String },
    rejectedAt: { type: Date },
    rejectedBy: { type: Schema.Types.ObjectId, required: false },

    refundDuration: { type: Number, required: true },

    organizationServiceId: { type: Schema.Types.ObjectId, default: null },
  },
  defaultSchemaOptions,
);

import { Schema } from 'mongoose';
import { defaultSchemaOptions } from '~/commons/mongoose/schemas';
import { RemboursementStatus } from '../enums/remboursement-status.enum';

export const remboursementSchema = new Schema(
  {
    amount: { type: Number, default: 0, required: true },
    status: {
      type: String,
      default: RemboursementStatus.PENDING,
      required: true,
    },
    fees: { type: Number, default: 0 },
    createdAtMonth: { type: Number },
    createdAtYear: { type: Number },
    validatedAt: { type: Date },
    validatedAtMonth: { type: Number },
    validatedAtYear: { type: Number },

    demandeId: { type: Schema.Types.ObjectId },
    userId: { type: Schema.Types.ObjectId, default: null },
  },
  defaultSchemaOptions,
);

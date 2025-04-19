import { Schema } from 'mongoose';
import { defaultSchemaOptions } from '~/commons/mongoose/schemas';

export const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    identifier: { type: String, unique: true },
    refundDurationMonth: { type: Number, default: 1 },
    availaible: { type: Boolean, default: false },

    publishedBy: { type: Schema.Types.ObjectId },
    publishedAt: { type: Date },
    addedBy: { type: Schema.Types.ObjectId },
  },
  defaultSchemaOptions,
);

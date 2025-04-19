import { Schema } from 'mongoose';
import { categorySocioproModelName } from '~/category-sociopro/schemas/category-sociopro.model-name';
import { AmountUnit, DurationUnit } from '~/commons/enum';
import { defaultSchemaOptions } from '~/commons/mongoose/schemas';
import { eventModelName } from '~/event/schemas/event.model-name';
import { organisationServiceModelName } from '~/organisation-service/schemas/organisation-service.model-name';

export const categorySocioproServiceSchema = new Schema(
  {
    amount: { type: Number, required: true },
    amountUnit: {
      type: String,
      enum: AmountUnit,
      default: AmountUnit.Percentage,
    },

    refundDuration: { type: Number, required: true },
    refundDurationUnit: {
      type: String,
      enum: DurationUnit,
      default: DurationUnit.Month,
    },

    activated: { type: Boolean, default: false },
    activatedAt: { type: Date },

    autoValidate: { type: Boolean, default: false },

    organisationServiceId: {
      type: Schema.Types.ObjectId,
      ref: organisationServiceModelName,
      required: true,
    },
    categorySocioproId: {
      type: Schema.Types.ObjectId,
      ref: categorySocioproModelName,
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: eventModelName,
      default: null,
    },
  },
  defaultSchemaOptions,
);

categorySocioproServiceSchema.index(
  { categorySocioproId: 1, organisationServiceId: 1, eventId: 1 },
  { unique: true },
);

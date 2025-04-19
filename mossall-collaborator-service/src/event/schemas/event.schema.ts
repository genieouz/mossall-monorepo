import { Schema } from 'mongoose';
import { AmountUnit, DurationUnit } from '~/commons/enum';
import { defaultSchemaOptions } from '~/commons/mongoose/schemas';
import { organisationServiceModelName } from '~/organisation-service/schemas/organisation-service.model-name';

export const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },

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

    organizationServiceId: {
      type: Schema.Types.ObjectId,
      ref: organisationServiceModelName,
      require: true,
    },
    addedBy: { type: Schema.Types.ObjectId },
  },
  defaultSchemaOptions,
);

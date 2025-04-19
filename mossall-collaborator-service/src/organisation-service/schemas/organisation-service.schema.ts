import { Schema } from 'mongoose';
import { AmountUnit, DurationUnit } from '~/commons/enum';
import { defaultSchemaOptions } from '~/commons/mongoose/schemas';
import { organizationModelName } from '~/organization/schemas/organization.model-name';
import { serviceModelName } from '~/service/schemas/service.model-name';

export const organisationServiceSchema = new Schema(
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
    activationDurationDay: { type: Number, default: 1 },

    autoValidate: { type: Boolean, default: false },

    organizationId: {
      type: Schema.Types.ObjectId,
      ref: organizationModelName,
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: serviceModelName,
      required: true,
    },
  },
  defaultSchemaOptions,
);

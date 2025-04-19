import { Schema } from 'mongoose';
import { defaultSchemaOptions } from '~/commons/mongoose/schemas';
import { organizationModelName } from '~/organization/schemas/organization.model-name';

export const categorySocioproSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },

    activated: { type: Boolean },
    activatedAt: { type: Date },

    addedBy: { type: Schema.Types.ObjectId },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: organizationModelName,
      required: true,
    },
  },
  defaultSchemaOptions,
);

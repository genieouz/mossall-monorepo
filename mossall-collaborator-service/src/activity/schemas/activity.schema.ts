import { Schema } from 'mongoose';
import { defaultSchemaOptions } from '~/commons/mongoose/schemas';

export const activitieschema = new Schema({
    message: { type: String, required: true },
    initialValue: { type: Schema.Types.Mixed },
    currentValue: { type: Schema.Types.Mixed },
    meta: { type: Schema.Types.Mixed },
    user: { type: Schema.Types.ObjectId, required: true },
    scope: { type: String, required: true },
    organization: { type: Schema.Types.ObjectId, required: true }
}, defaultSchemaOptions);

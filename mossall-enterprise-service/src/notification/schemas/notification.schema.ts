import { Schema } from 'mongoose';
import { defaultSchemaOptions } from '~/commons/mongoose/schemas';

export const notificationSchema = new Schema({
    entityId: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.Mixed, required: true },
    organization: { type: Schema.Types.ObjectId, required: true },
    viewedBy: [{ type: String }]
}, defaultSchemaOptions);

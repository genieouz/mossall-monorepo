import { Schema } from 'mongoose';

export const tokenAcknowledgmentSchema = new Schema({
    token: { type: String, required: true },
    code: { type: String, required: true },
    email: { type: String, required: true },
});

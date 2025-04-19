import { Document } from 'mongoose';
export interface ITokenAcknowledgment extends Document {
    token: string;
    code: string;
    email: string;
}

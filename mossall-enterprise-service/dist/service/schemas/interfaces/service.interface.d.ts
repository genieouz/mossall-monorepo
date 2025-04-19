import { Document } from 'mongoose';
export interface IService extends Document {
    title: string;
    description: string;
    identifier: string;
    available: boolean;
    refundDurationMonth: number;
    addedBy?: string;
}

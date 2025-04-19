import { Document } from 'mongoose';

export interface IDemande extends Document {
    organization: string;
    amount: number;
    owner: string;
    status: string;
}

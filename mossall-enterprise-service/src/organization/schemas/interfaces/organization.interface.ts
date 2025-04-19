import { Document } from 'mongoose';

export interface IOrganization extends Document {
    name: string;
    rootUser: string;
    rootEmail: string;
    rootFirstname: string;
    rootLastname: string;
    maxDemandeAmount: number;
    amountPercent: number;
    fees: number;
}

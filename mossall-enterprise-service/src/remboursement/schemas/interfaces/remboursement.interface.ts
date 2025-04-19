import { Document } from 'mongoose';

export interface IRemboursement extends Document {
  amount: number;
  status: string;
  number?: number;
  fees?: number;

  demandeId: string;
  userId?: string;
  validatedAt?: Date;
  validatedBy?: string;
}

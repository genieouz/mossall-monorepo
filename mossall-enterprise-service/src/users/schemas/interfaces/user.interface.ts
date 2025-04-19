import { Document } from 'mongoose';
import { EnumState } from '~/commons/interfaces/state.interface';

export interface IUser extends Document {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  phoneNumber?: string;
  address?: string;
  position?: string;
  uniqueIdentifier?: string;
  salary?: number;
  balance?: number;
  wizallAccountNumber?: string;
  bankAccountNumber?: string;
  totalDemandeAmount: number;
  role?: string;
  realm?: string;
  blocked?: boolean;
  password?: string;
  status: EnumState;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

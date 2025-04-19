import { Document } from 'mongoose';
export interface IUser extends Document {
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
    enabled: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

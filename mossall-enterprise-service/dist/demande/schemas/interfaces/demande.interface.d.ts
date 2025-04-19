import { Document } from 'mongoose';
export interface IDemande extends Document {
    organization: string;
    amount: number;
    owner: string;
    status: string;
    number?: string;
    rejectedReason?: string;
    createdAt: Date;
    updatedAt: Date;
    validatedBy?: string;
    transactionReference?: string;
    validatedByBeforeWebhook?: string;
    remainingRefundAmount: number;
    refundAmount?: number;
    refundDuration: number;
    organizationServiceId: string;
}

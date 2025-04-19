import { registerEnumType } from "@nestjs/graphql";

export enum AlalPaymentStatus {
    success = 'success',
    failed = 'failed',
    pending = 'pending',
    processing = 'processing'
}

registerEnumType(AlalPaymentStatus, { name: 'AlalPaymentStatus' });

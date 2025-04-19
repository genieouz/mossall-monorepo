/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from 'mongoose';
export declare const demandeSchema: Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: boolean;
    toJSON: {
        virtuals: boolean;
    };
    strict: boolean;
}>, {
    organization: import("mongoose").Types.ObjectId;
    status: string;
    amount: number;
    owner: import("mongoose").Types.ObjectId;
    refundAmount: number;
    refundDuration: number;
    organizationServiceId: import("mongoose").Types.ObjectId;
    pendingPayment: boolean;
    fees: number;
    remaingRefundAmount: number;
    rejectedReason?: string;
    validatedBy?: import("mongoose").Types.ObjectId;
    transactionReference?: string;
    validatedByBeforeWebhook?: import("mongoose").Types.ObjectId;
    validatedAt?: Date;
    createdAtMonth?: number;
    createdAtYear?: number;
    validatedAtMonth?: number;
    validatedAtYear?: number;
    rejectedAt?: Date;
    rejectedBy?: import("mongoose").Types.ObjectId;
}>;

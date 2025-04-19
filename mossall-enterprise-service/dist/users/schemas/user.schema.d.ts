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
import { UserRole } from '../enums/user-role.enum';
export declare const userSchema: Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").ResolveSchemaOptions<{
    strict: false;
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    firstName: string;
    lastName: string;
    organization: import("mongoose").Types.ObjectId;
    balance: number;
    totalDemandeAmount: number;
    role: UserRole;
    blocked: boolean;
    password: string;
    categorySocioPro: import("mongoose").Types.ObjectId;
    phoneNumber?: string;
    address?: string;
    position?: string;
    uniqueIdentifier?: string;
    salary?: number;
    wizallAccountNumber?: string;
    bankAccountNumber?: string;
    realm?: string;
    status?: string;
    enabled?: boolean;
    enableEmailNotification?: boolean;
    birthDate?: Date;
    favoriteWallet?: string;
    fonction?: string;
}>;

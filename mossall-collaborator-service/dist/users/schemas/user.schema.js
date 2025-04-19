"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const user_role_enum_1 = require("../enums/user-role.enum");
exports.userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    realm: { type: String },
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'organization',
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(user_role_enum_1.UserRole),
        default: user_role_enum_1.UserRole.COLLABORATOR,
    },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    position: { type: String, required: false },
    uniqueIdentifier: { type: String, required: false },
    salary: { type: Number, required: false },
    wizallAccountNumber: { type: String, required: false },
    bankAccountNumber: { type: String, required: false },
    totalDemandeAmount: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    blocked: { type: Boolean, default: false },
    birthDate: { type: Date, required: false },
    enableEmailNotification: { type: Boolean, default: true, required: false },
    password: { type: String, required: true },
    status: { type: String, required: false },
    enabled: { type: Boolean, default: false, required: false },
    fonction: { type: String, required: false },
}, { strict: false, timestamps: true });
exports.userSchema.index({ email: 1, realm: 1 }, { unique: true });
exports.userSchema.index({ phoneNumber: 1, realm: 1, organization: 1 }, { unique: true });
exports.userSchema.index({ uniqueIdentifier: 1, realm: 1, organization: 1 }, { unique: true });
exports.userSchema.index({ bankAccountNumber: 1, realm: 1, organization: 1 }, { unique: true });
//# sourceMappingURL=user.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demandeSchema = void 0;
const mongoose_1 = require("mongoose");
const schemas_1 = require("../../commons/mongoose/schemas");
const demande_status_enum_1 = require("../enums/demande-status.enum");
exports.demandeSchema = new mongoose_1.Schema({
    amount: { type: Number, default: 0, required: true },
    status: { type: String, default: demande_status_enum_1.DemandeStatus.PENDING, required: true },
    organization: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    owner: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    fees: { type: Number, default: 0 },
    createdAtMonth: { type: Number },
    createdAtYear: { type: Number },
    validatedAt: { type: Date },
    validatedAtMonth: { type: Number },
    validatedAtYear: { type: Number },
    validatedBy: { type: mongoose_1.Schema.Types.ObjectId, required: false },
    validatedByBeforeWebhook: { type: mongoose_1.Schema.Types.ObjectId, required: false },
    pendingPayment: { type: Boolean, default: false },
    rejectedReason: { type: String },
    transactionReference: { type: String },
    rejectedAt: { type: Date },
    rejectedBy: { type: mongoose_1.Schema.Types.ObjectId, required: false },
    refundAmount: { type: Number, default: 0 },
    remaingRefundAmount: { type: Number, default: 0 },
    refundDuration: { type: Number, required: true },
    organizationServiceId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
}, schemas_1.defaultSchemaOptions);
//# sourceMappingURL=demande.schema.js.map
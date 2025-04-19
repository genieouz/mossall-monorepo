"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remboursementSchema = void 0;
const mongoose_1 = require("mongoose");
const schemas_1 = require("../../commons/mongoose/schemas");
const remboursement_status_enum_1 = require("../enums/remboursement-status.enum");
exports.remboursementSchema = new mongoose_1.Schema({
    amount: { type: Number, default: 0, required: true },
    status: {
        type: String,
        default: remboursement_status_enum_1.RemboursementStatus.PENDING,
        required: true,
    },
    fees: { type: Number, default: 0 },
    createdAtMonth: { type: Number },
    createdAtYear: { type: Number },
    validatedAt: { type: Date },
    validatedAtMonth: { type: Number },
    validatedAtYear: { type: Number },
    demandeId: { type: mongoose_1.Schema.Types.ObjectId },
    userId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
}, schemas_1.defaultSchemaOptions);
//# sourceMappingURL=remboursement.schema.js.map
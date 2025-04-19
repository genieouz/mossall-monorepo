"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSchema = void 0;
const mongoose_1 = require("mongoose");
const schemas_1 = require("../../commons/mongoose/schemas");
const customerSchema = new mongoose_1.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    bank_name: { type: String, required: false },
    bank_id: { type: String, required: false },
    bank_account_name: { type: String, required: false }
});
exports.paymentSchema = new mongoose_1.Schema({
    business: { type: String, required: false },
    customer: { type: customerSchema, required: true },
    slug: { type: String, required: false },
    reference: { type: String, required: true },
    kind: { type: String, required: false },
    network: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    expired_at: { type: Date, required: false },
    meta: { type: mongoose_1.Schema.Types.Mixed }
}, schemas_1.defaultSchemaOptions);
//# sourceMappingURL=payment.schema.js.map
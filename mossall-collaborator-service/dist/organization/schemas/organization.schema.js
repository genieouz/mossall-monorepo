"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.organizationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    rootEmail: { type: String, required: true },
    rootUser: { type: String, required: true },
    maxDemandeAmount: { type: Number, default: 0 },
    amountPercent: { type: Number, default: 75 },
    fees: { type: Number, default: 0 },
    demandeDeadlineDay: { type: Number, default: 15 },
});
//# sourceMappingURL=organization.schema.js.map
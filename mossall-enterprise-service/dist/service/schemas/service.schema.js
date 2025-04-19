"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSchema = void 0;
const mongoose_1 = require("mongoose");
const schemas_1 = require("../../commons/mongoose/schemas");
exports.serviceSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    identifier: { type: String, unique: true },
    refundDurationMonth: { type: Number, default: 1 },
    availaible: { type: Boolean, default: false },
    publishedBy: { type: mongoose_1.Schema.Types.ObjectId },
    publishedAt: { type: Date },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId },
}, schemas_1.defaultSchemaOptions);
//# sourceMappingURL=service.schema.js.map
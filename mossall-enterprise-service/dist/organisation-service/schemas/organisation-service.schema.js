"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organisationServiceSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../commons/enum");
const schemas_1 = require("../../commons/mongoose/schemas");
const organization_model_name_1 = require("../../organization/schemas/organization.model-name");
const service_model_name_1 = require("../../service/schemas/service.model-name");
exports.organisationServiceSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true },
    amountUnit: {
        type: String,
        enum: enum_1.AmountUnit,
        default: enum_1.AmountUnit.Percentage,
    },
    refundDuration: { type: Number, required: true },
    refundDurationUnit: {
        type: String,
        enum: enum_1.DurationUnit,
        default: enum_1.DurationUnit.Month,
    },
    activated: { type: Boolean, default: false },
    activatedAt: { type: Date },
    activationDurationDay: { type: Number, default: 1 },
    autoValidate: { type: Boolean, default: false },
    organizationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: organization_model_name_1.organizationModelName,
        required: true,
    },
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: service_model_name_1.serviceModelName,
        required: true,
    },
}, schemas_1.defaultSchemaOptions);
//# sourceMappingURL=organisation-service.schema.js.map
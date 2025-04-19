"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../commons/enum");
const schemas_1 = require("../../commons/mongoose/schemas");
const organisation_service_model_name_1 = require("../../organisation-service/schemas/organisation-service.model-name");
exports.eventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
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
    autoValidate: { type: Boolean, default: false },
    organizationServiceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: organisation_service_model_name_1.organisationServiceModelName,
        require: true,
    },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId },
}, schemas_1.defaultSchemaOptions);
//# sourceMappingURL=event.schema.js.map
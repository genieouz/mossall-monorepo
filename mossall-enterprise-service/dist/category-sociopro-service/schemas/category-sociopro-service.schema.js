"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySocioproServiceSchema = void 0;
const mongoose_1 = require("mongoose");
const category_sociopro_model_name_1 = require("../../category-sociopro/schemas/category-sociopro.model-name");
const enum_1 = require("../../commons/enum");
const schemas_1 = require("../../commons/mongoose/schemas");
const event_model_name_1 = require("../../event/schemas/event.model-name");
const organisation_service_model_name_1 = require("../../organisation-service/schemas/organisation-service.model-name");
exports.categorySocioproServiceSchema = new mongoose_1.Schema({
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
    organisationServiceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: organisation_service_model_name_1.organisationServiceModelName,
        required: true,
    },
    categorySocioproId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: category_sociopro_model_name_1.categorySocioproModelName,
        required: true,
    },
    eventId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: event_model_name_1.eventModelName,
        default: null,
    },
}, schemas_1.defaultSchemaOptions);
exports.categorySocioproServiceSchema.index({ categorySocioproId: 1, organisationServiceId: 1, eventId: 1 }, { unique: true });
//# sourceMappingURL=category-sociopro-service.schema.js.map
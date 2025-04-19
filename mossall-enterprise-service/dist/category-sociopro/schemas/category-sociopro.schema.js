"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySocioproSchema = void 0;
const mongoose_1 = require("mongoose");
const schemas_1 = require("../../commons/mongoose/schemas");
const organization_model_name_1 = require("../../organization/schemas/organization.model-name");
exports.categorySocioproSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    activated: { type: Boolean },
    activatedAt: { type: Date },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId },
    organizationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: organization_model_name_1.organizationModelName,
        required: true,
    },
}, schemas_1.defaultSchemaOptions);
//# sourceMappingURL=category-sociopro.schema.js.map
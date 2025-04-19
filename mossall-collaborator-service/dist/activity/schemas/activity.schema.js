"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitieschema = void 0;
const mongoose_1 = require("mongoose");
const schemas_1 = require("../../commons/mongoose/schemas");
exports.activitieschema = new mongoose_1.Schema({
    message: { type: String, required: true },
    initialValue: { type: mongoose_1.Schema.Types.Mixed },
    currentValue: { type: mongoose_1.Schema.Types.Mixed },
    meta: { type: mongoose_1.Schema.Types.Mixed },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    scope: { type: String, required: true },
    organization: { type: mongoose_1.Schema.Types.ObjectId, required: true }
}, schemas_1.defaultSchemaOptions);
//# sourceMappingURL=activity.schema.js.map
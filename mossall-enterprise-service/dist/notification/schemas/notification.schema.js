"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationSchema = void 0;
const mongoose_1 = require("mongoose");
const schemas_1 = require("../../commons/mongoose/schemas");
exports.notificationSchema = new mongoose_1.Schema({
    entityId: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.Mixed, required: true },
    organization: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    viewedBy: [{ type: String }]
}, schemas_1.defaultSchemaOptions);
//# sourceMappingURL=notification.schema.js.map
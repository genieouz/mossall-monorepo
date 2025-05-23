"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenAcknowledgmentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.tokenAcknowledgmentSchema = new mongoose_1.Schema({
    token: { type: String, required: true },
    code: { type: String, required: true },
    email: { type: String, required: true },
});
//# sourceMappingURL=token-acknowledgment.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlalPaymentStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var AlalPaymentStatus;
(function (AlalPaymentStatus) {
    AlalPaymentStatus["success"] = "success";
    AlalPaymentStatus["failed"] = "failed";
    AlalPaymentStatus["pending"] = "pending";
    AlalPaymentStatus["processing"] = "processing";
})(AlalPaymentStatus = exports.AlalPaymentStatus || (exports.AlalPaymentStatus = {}));
(0, graphql_1.registerEnumType)(AlalPaymentStatus, { name: 'AlalPaymentStatus' });
//# sourceMappingURL=alal-payment-status.enum.js.map
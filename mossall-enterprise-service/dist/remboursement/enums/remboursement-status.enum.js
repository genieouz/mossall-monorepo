"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemboursementStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var RemboursementStatus;
(function (RemboursementStatus) {
    RemboursementStatus["PAYED"] = "PAYED";
    RemboursementStatus["PENDING"] = "PENDING";
})(RemboursementStatus = exports.RemboursementStatus || (exports.RemboursementStatus = {}));
(0, graphql_1.registerEnumType)(RemboursementStatus, { name: 'RemboursementStatus' });
//# sourceMappingURL=remboursement-status.enum.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var DemandeStatus;
(function (DemandeStatus) {
    DemandeStatus["VALIDATED"] = "VALIDATED";
    DemandeStatus["PAYED"] = "PAYED";
    DemandeStatus["REJECTED"] = "REJECTED";
    DemandeStatus["PENDING"] = "PENDING";
    DemandeStatus["IN_PROCESS"] = "IN_PROCESS";
    DemandeStatus["CANCELLED"] = "CANCELLED";
})(DemandeStatus = exports.DemandeStatus || (exports.DemandeStatus = {}));
(0, graphql_1.registerEnumType)(DemandeStatus, { name: 'DemandeStatus' });
//# sourceMappingURL=demande-status.enum.js.map
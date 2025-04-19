"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationType = void 0;
const graphql_1 = require("@nestjs/graphql");
var OrganizationType;
(function (OrganizationType) {
    OrganizationType["FINANCIAL"] = "FINANCIAL";
    OrganizationType["DEFAULT"] = "DEFAULT";
})(OrganizationType = exports.OrganizationType || (exports.OrganizationType = {}));
(0, graphql_1.registerEnumType)(OrganizationType, { name: 'OrganizationType' });
//# sourceMappingURL=organization-type.enum.js.map
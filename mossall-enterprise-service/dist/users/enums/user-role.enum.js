"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const graphql_1 = require("@nestjs/graphql");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["SUPER_ADMIN_ORG"] = "SUPER_ADMIN_ORG";
    UserRole["COLLABORATOR"] = "COLLABORATOR";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
(0, graphql_1.registerEnumType)(UserRole, { name: 'UserRole', description: "Possible user role" });
//# sourceMappingURL=user-role.enum.js.map
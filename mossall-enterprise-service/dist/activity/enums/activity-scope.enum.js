"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityScope = void 0;
const graphql_1 = require("@nestjs/graphql");
var ActivityScope;
(function (ActivityScope) {
    ActivityScope["demande"] = "demande";
    ActivityScope["authentification"] = "authentification";
    ActivityScope["collaborateur"] = "collaborateur";
    ActivityScope["organisation"] = "organisation";
})(ActivityScope = exports.ActivityScope || (exports.ActivityScope = {}));
(0, graphql_1.registerEnumType)(ActivityScope, { name: 'ActivityScope', description: "Possible activities" });
//# sourceMappingURL=activity-scope.enum.js.map
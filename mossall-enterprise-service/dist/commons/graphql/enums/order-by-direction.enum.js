"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderByDirection = void 0;
const graphql_1 = require("@nestjs/graphql");
var OrderByDirection;
(function (OrderByDirection) {
    OrderByDirection[OrderByDirection["ASC"] = 1] = "ASC";
    OrderByDirection[OrderByDirection["DESC"] = -1] = "DESC";
})(OrderByDirection = exports.OrderByDirection || (exports.OrderByDirection = {}));
(0, graphql_1.registerEnumType)(OrderByDirection, { name: 'OrderByDirection', description: "Sort order" });
//# sourceMappingURL=order-by-direction.enum.js.map
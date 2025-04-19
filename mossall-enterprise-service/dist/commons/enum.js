"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DurationUnit = exports.AmountUnit = void 0;
const graphql_1 = require("@nestjs/graphql");
var AmountUnit;
(function (AmountUnit) {
    AmountUnit["Fixed"] = "Fixed";
    AmountUnit["Percentage"] = "Percentage";
})(AmountUnit = exports.AmountUnit || (exports.AmountUnit = {}));
var DurationUnit;
(function (DurationUnit) {
    DurationUnit["Day"] = "day";
    DurationUnit["Month"] = "month";
})(DurationUnit = exports.DurationUnit || (exports.DurationUnit = {}));
(0, graphql_1.registerEnumType)(AmountUnit, {
    name: 'AmountUnit',
});
(0, graphql_1.registerEnumType)(DurationUnit, {
    name: 'DurationUnit',
});
//# sourceMappingURL=enum.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandesTotalAmount = exports.DemandesMetrics = exports.DemandesMetricsRow = void 0;
const graphql_1 = require("@nestjs/graphql");
let DemandesMetricsRow = class DemandesMetricsRow {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DemandesMetricsRow.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DemandesMetricsRow.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DemandesMetricsRow.prototype, "month", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DemandesMetricsRow.prototype, "year", void 0);
DemandesMetricsRow = __decorate([
    (0, graphql_1.ObjectType)()
], DemandesMetricsRow);
exports.DemandesMetricsRow = DemandesMetricsRow;
let DemandesMetrics = class DemandesMetrics {
};
__decorate([
    (0, graphql_1.Field)((type) => [DemandesMetricsRow]),
    __metadata("design:type", Array)
], DemandesMetrics.prototype, "payed", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [DemandesMetricsRow]),
    __metadata("design:type", Array)
], DemandesMetrics.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [DemandesMetricsRow]),
    __metadata("design:type", Array)
], DemandesMetrics.prototype, "remaining", void 0);
DemandesMetrics = __decorate([
    (0, graphql_1.ObjectType)()
], DemandesMetrics);
exports.DemandesMetrics = DemandesMetrics;
let DemandesTotalAmount = class DemandesTotalAmount {
};
__decorate([
    (0, graphql_1.Field)((type) => Number),
    __metadata("design:type", Number)
], DemandesTotalAmount.prototype, "total", void 0);
DemandesTotalAmount = __decorate([
    (0, graphql_1.ObjectType)()
], DemandesTotalAmount);
exports.DemandesTotalAmount = DemandesTotalAmount;
//# sourceMappingURL=demandes-metrics.entity.js.map
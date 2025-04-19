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
exports.DemandeMetricFilter = exports.DemandeMetric = void 0;
const graphql_1 = require("@nestjs/graphql");
let DemandeMetric = class DemandeMetric {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DemandeMetric.prototype, "year", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DemandeMetric.prototype, "month", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DemandeMetric.prototype, "value", void 0);
DemandeMetric = __decorate([
    (0, graphql_1.ObjectType)()
], DemandeMetric);
exports.DemandeMetric = DemandeMetric;
let DemandeMetricFilter = class DemandeMetricFilter {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], DemandeMetricFilter.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], DemandeMetricFilter.prototype, "endDate", void 0);
DemandeMetricFilter = __decorate([
    (0, graphql_1.InputType)()
], DemandeMetricFilter);
exports.DemandeMetricFilter = DemandeMetricFilter;
//# sourceMappingURL=demande-metrics.entity.js.map
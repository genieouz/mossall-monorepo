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
exports.DemandesMetricsInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const demande_status_enum_1 = require("../enums/demande-status.enum");
let DemandesMetricsInput = class DemandesMetricsInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true, defaultValue: new Date("2023-01-01") }),
    __metadata("design:type", Date)
], DemandesMetricsInput.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, defaultValue: new Date("2030-12-31") }),
    __metadata("design:type", Date)
], DemandesMetricsInput.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], DemandesMetricsInput.prototype, "minimum", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], DemandesMetricsInput.prototype, "maximum", void 0);
__decorate([
    (0, graphql_1.Field)(type => demande_status_enum_1.DemandeStatus, { nullable: true }),
    __metadata("design:type", String)
], DemandesMetricsInput.prototype, "status", void 0);
DemandesMetricsInput = __decorate([
    (0, graphql_1.InputType)()
], DemandesMetricsInput);
exports.DemandesMetricsInput = DemandesMetricsInput;
//# sourceMappingURL=demandes-metrics.input.js.map
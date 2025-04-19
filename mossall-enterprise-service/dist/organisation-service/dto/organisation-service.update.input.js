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
exports.OrganisationServiceUpdateInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const enum_1 = require("../../commons/enum");
let OrganisationServiceUpdateInput = class OrganisationServiceUpdateInput {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], OrganisationServiceUpdateInput.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)((type) => enum_1.AmountUnit, { nullable: true }),
    __metadata("design:type", String)
], OrganisationServiceUpdateInput.prototype, "amountUnit", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], OrganisationServiceUpdateInput.prototype, "refundDuration", void 0);
__decorate([
    (0, graphql_1.Field)((type) => enum_1.DurationUnit, { nullable: true }),
    __metadata("design:type", String)
], OrganisationServiceUpdateInput.prototype, "refundDurationUnit", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], OrganisationServiceUpdateInput.prototype, "activated", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Date, { nullable: true }),
    __metadata("design:type", Date)
], OrganisationServiceUpdateInput.prototype, "activatedAt", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], OrganisationServiceUpdateInput.prototype, "activationDurationDay", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], OrganisationServiceUpdateInput.prototype, "autoValidate", void 0);
OrganisationServiceUpdateInput = __decorate([
    (0, graphql_1.InputType)()
], OrganisationServiceUpdateInput);
exports.OrganisationServiceUpdateInput = OrganisationServiceUpdateInput;
//# sourceMappingURL=organisation-service.update.input.js.map
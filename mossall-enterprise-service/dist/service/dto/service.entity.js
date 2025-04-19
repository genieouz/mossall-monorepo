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
exports.PaginatedServiceResult = exports.Service = void 0;
const graphql_1 = require("@nestjs/graphql");
const pagination_1 = require("../../commons/graphql/pagination");
const timestamps_entity_1 = require("../../commons/graphql/types/timestamps/timestamps.entity");
const any_scalar_1 = require("../../commons/graphql/scalars/any.scalar");
let Service = class Service extends timestamps_entity_1.Timestamps {
};
__decorate([
    (0, graphql_1.Field)((type) => any_scalar_1.Any),
    __metadata("design:type", String)
], Service.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Service.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Service.prototype, "identifier", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Service.prototype, "refundDurationMonth", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Boolean),
    __metadata("design:type", Boolean)
], Service.prototype, "available", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Service.prototype, "publishedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Service.prototype, "addedBy", void 0);
Service = __decorate([
    (0, graphql_1.ObjectType)()
], Service);
exports.Service = Service;
let PaginatedServiceResult = class PaginatedServiceResult extends (0, pagination_1.PaginatedResult)(Service) {
};
PaginatedServiceResult = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedServiceResult);
exports.PaginatedServiceResult = PaginatedServiceResult;
//# sourceMappingURL=service.entity.js.map
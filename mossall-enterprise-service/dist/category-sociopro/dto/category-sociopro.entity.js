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
exports.PaginatedCategorySocioproResult = exports.CategorySociopro = void 0;
const graphql_1 = require("@nestjs/graphql");
const pagination_1 = require("../../commons/graphql/pagination");
const timestamps_entity_1 = require("../../commons/graphql/types/timestamps/timestamps.entity");
const any_scalar_1 = require("../../commons/graphql/scalars/any.scalar");
let CategorySociopro = class CategorySociopro extends timestamps_entity_1.Timestamps {
};
__decorate([
    (0, graphql_1.Field)((type) => any_scalar_1.Any),
    __metadata("design:type", String)
], CategorySociopro.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CategorySociopro.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CategorySociopro.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], CategorySociopro.prototype, "activated", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CategorySociopro.prototype, "organizationId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CategorySociopro.prototype, "addedBy", void 0);
CategorySociopro = __decorate([
    (0, graphql_1.ObjectType)()
], CategorySociopro);
exports.CategorySociopro = CategorySociopro;
let PaginatedCategorySocioproResult = class PaginatedCategorySocioproResult extends (0, pagination_1.PaginatedResult)(CategorySociopro) {
};
PaginatedCategorySocioproResult = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedCategorySocioproResult);
exports.PaginatedCategorySocioproResult = PaginatedCategorySocioproResult;
//# sourceMappingURL=category-sociopro.entity.js.map
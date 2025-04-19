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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySocioproPropertyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const category_sociopro_entity_1 = require("../dto/category-sociopro.entity");
const organization_service_1 = require("../../organization/services/organization.service");
const organization_entity_1 = require("../../organization/dto/organization.entity");
let CategorySocioproPropertyResolver = class CategorySocioproPropertyResolver {
    constructor(organisationService) {
        this.organisationService = organisationService;
    }
    organisation(categorySociopro) {
        return this.organisationService.findOneById(categorySociopro.organizationId);
    }
};
__decorate([
    (0, graphql_1.ResolveField)((returns) => organization_entity_1.Organization),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategorySocioproPropertyResolver.prototype, "organisation", null);
CategorySocioproPropertyResolver = __decorate([
    (0, graphql_1.Resolver)((of) => category_sociopro_entity_1.CategorySociopro),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], CategorySocioproPropertyResolver);
exports.CategorySocioproPropertyResolver = CategorySocioproPropertyResolver;
//# sourceMappingURL=category-sociopro-property.resolver.js.map
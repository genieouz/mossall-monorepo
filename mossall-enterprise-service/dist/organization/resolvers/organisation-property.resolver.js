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
exports.OrganizationPropertyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const organization_entity_1 = require("../dto/organization.entity");
const organisation_service_service_1 = require("../../organisation-service/services/organisation-service.service");
const organisation_service_entity_1 = require("../../organisation-service/dto/organisation-service.entity");
let OrganizationPropertyResolver = class OrganizationPropertyResolver {
    constructor(organisationServiceService) {
        this.organisationServiceService = organisationServiceService;
    }
    async organisationService(organization) {
        return this.organisationServiceService.findMany({
            organizationId: organization._id,
        });
    }
};
__decorate([
    (0, graphql_1.ResolveField)((returns) => [organisation_service_entity_1.OrganisationService], { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationPropertyResolver.prototype, "organisationService", null);
OrganizationPropertyResolver = __decorate([
    (0, graphql_1.Resolver)((of) => organization_entity_1.Organization),
    __metadata("design:paramtypes", [organisation_service_service_1.OrganisationServiceService])
], OrganizationPropertyResolver);
exports.OrganizationPropertyResolver = OrganizationPropertyResolver;
//# sourceMappingURL=organisation-property.resolver.js.map
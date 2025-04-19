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
exports.OrganizationServicePropertyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const organisation_service_entity_1 = require("../dto/organisation-service.entity");
const organization_entity_1 = require("../../organization/dto/organization.entity");
const organization_service_1 = require("../../organization/services/organization.service");
const event_entity_1 = require("../../event/dto/event.entity");
const event_service_1 = require("../../event/services/event.service");
const service_entity_1 = require("../../service/dto/service.entity");
const service_service_1 = require("../../service/services/service.service");
const demande_entity_1 = require("../../demande/dto/demande.entity");
const demande_service_1 = require("../../demande/services/demande.service");
const category_sociopro_service_service_1 = require("../../category-sociopro-service/services/category-sociopro-service.service");
const category_sociopro_service_entity_1 = require("../../category-sociopro-service/dto/category-sociopro-service.entity");
let OrganizationServicePropertyResolver = class OrganizationServicePropertyResolver {
    constructor(organizationService, eventService, serviceService, categorySocioproService, demandeService) {
        this.organizationService = organizationService;
        this.eventService = eventService;
        this.serviceService = serviceService;
        this.categorySocioproService = categorySocioproService;
        this.demandeService = demandeService;
    }
    async organization(_organizationService) {
        return this.organizationService.findOneById(_organizationService.organizationId);
    }
    async service(_organizationService) {
        return this.serviceService.findOneById(_organizationService.serviceId);
    }
    async events(_organizationService) {
        return this.eventService.findMany({
            organizationServiceId: _organizationService._id,
        });
    }
    async categoriesocioproservices(_organizationService) {
        return this.categorySocioproService.findMany({
            organisationServiceId: _organizationService._id,
        });
    }
    async demandes(_organizationService) {
        return this.demandeService.findMany({
            organizationServiceId: _organizationService._id,
        });
    }
};
__decorate([
    (0, graphql_1.ResolveField)((returns) => organization_entity_1.Organization),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationServicePropertyResolver.prototype, "organization", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => service_entity_1.Service),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationServicePropertyResolver.prototype, "service", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => [event_entity_1.Event], { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationServicePropertyResolver.prototype, "events", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => [category_sociopro_service_entity_1.CategorySocioproService], { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationServicePropertyResolver.prototype, "categoriesocioproservices", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => [demande_entity_1.Demande], { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationServicePropertyResolver.prototype, "demandes", null);
OrganizationServicePropertyResolver = __decorate([
    (0, graphql_1.Resolver)((of) => organisation_service_entity_1.OrganisationService),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService,
        event_service_1.EventService,
        service_service_1.ServiceService,
        category_sociopro_service_service_1.CategorySocioproServiceService,
        demande_service_1.DemandeService])
], OrganizationServicePropertyResolver);
exports.OrganizationServicePropertyResolver = OrganizationServicePropertyResolver;
//# sourceMappingURL=organisation-service-property.resolver.js.map
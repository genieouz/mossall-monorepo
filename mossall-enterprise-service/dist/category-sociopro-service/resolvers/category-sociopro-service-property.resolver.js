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
exports.CategorySocioproServicePropertyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const category_sociopro_service_entity_1 = require("../dto/category-sociopro-service.entity");
const category_sociopro_service_1 = require("../../category-sociopro/services/category-sociopro.service");
const category_sociopro_entity_1 = require("../../category-sociopro/dto/category-sociopro.entity");
const organisation_service_entity_1 = require("../../organisation-service/dto/organisation-service.entity");
const organisation_service_service_1 = require("../../organisation-service/services/organisation-service.service");
const event_service_1 = require("../../event/services/event.service");
const event_entity_1 = require("../../event/dto/event.entity");
let CategorySocioproServicePropertyResolver = class CategorySocioproServicePropertyResolver {
    constructor(categorySocioproService, organisationServiceService, eventService) {
        this.categorySocioproService = categorySocioproService;
        this.organisationServiceService = organisationServiceService;
        this.eventService = eventService;
    }
    async categorySociopro(categorySocioproService) {
        return this.categorySocioproService.findOneById(categorySocioproService.categorySocioproId);
    }
    async organisationService(categorySocioproService) {
        return this.organisationServiceService.findOneById(categorySocioproService.organisationServiceId);
    }
    async event(categorySocioproService) {
        return this.eventService.findOneById(categorySocioproService.eventId);
    }
};
__decorate([
    (0, graphql_1.ResolveField)((returns) => category_sociopro_entity_1.CategorySociopro, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_sociopro_service_entity_1.CategorySocioproService]),
    __metadata("design:returntype", Promise)
], CategorySocioproServicePropertyResolver.prototype, "categorySociopro", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => organisation_service_entity_1.OrganisationService, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_sociopro_service_entity_1.CategorySocioproService]),
    __metadata("design:returntype", Promise)
], CategorySocioproServicePropertyResolver.prototype, "organisationService", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => event_entity_1.Event, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_sociopro_service_entity_1.CategorySocioproService]),
    __metadata("design:returntype", Promise)
], CategorySocioproServicePropertyResolver.prototype, "event", null);
CategorySocioproServicePropertyResolver = __decorate([
    (0, graphql_1.Resolver)((of) => category_sociopro_service_entity_1.CategorySocioproService),
    __metadata("design:paramtypes", [category_sociopro_service_1.CategorySocioproService,
        organisation_service_service_1.OrganisationServiceService,
        event_service_1.EventService])
], CategorySocioproServicePropertyResolver);
exports.CategorySocioproServicePropertyResolver = CategorySocioproServicePropertyResolver;
//# sourceMappingURL=category-sociopro-service-property.resolver.js.map
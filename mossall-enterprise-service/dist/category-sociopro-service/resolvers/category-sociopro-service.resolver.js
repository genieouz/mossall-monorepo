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
exports.CategorySocioproServiceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const query_data_config_input_1 = require("../../commons/graphql/query-data-config.input");
const category_sociopro_service_entity_1 = require("../dto/category-sociopro-service.entity");
const category_sociopro_service_input_1 = require("../dto/category-sociopro-service.input");
const category_sociopro_service_update_input_1 = require("../dto/category-sociopro-service.update.input");
const category_sociopro_service_service_1 = require("../services/category-sociopro-service.service");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/auth.guard");
const category_sociopro_service_1 = require("../../category-sociopro/services/category-sociopro.service");
const organisation_service_service_1 = require("../../organisation-service/services/organisation-service.service");
const event_service_1 = require("../../event/services/event.service");
let CategorySocioproServiceResolver = class CategorySocioproServiceResolver {
    constructor(categorySocioproServiceService, categorySocioproService, organisationServiceService, eventService) {
        this.categorySocioproServiceService = categorySocioproServiceService;
        this.categorySocioproService = categorySocioproService;
        this.organisationServiceService = organisationServiceService;
        this.eventService = eventService;
    }
    async createCategorySocioproService(categorySocioproServiceInput, categorySocioproId, organisationServiceId, eventId) {
        await this.organisationServiceService.findOneByIdOrFail(organisationServiceId);
        await this.categorySocioproService.findOneByIdOrFail(categorySocioproId);
        await this.organisationServiceService.findOneByIdOrFail(organisationServiceId);
        if (eventId) {
            await this.eventService.findOneByIdOrFail(eventId);
            categorySocioproServiceInput.eventId = eventId;
        }
        categorySocioproServiceInput.categorySocioproId = categorySocioproId;
        categorySocioproServiceInput.organisationServiceId = organisationServiceId;
        return this.categorySocioproServiceService.insertOne(categorySocioproServiceInput);
    }
    updateCategorySocioproService(categorySocioproServiceInput, categorySocioproServiceId) {
        return this.categorySocioproServiceService.updateOneById(categorySocioproServiceId, categorySocioproServiceInput);
    }
    fetchCategorySocioproServices(queryConfig) {
        return this.categorySocioproServiceService.findManyAndPaginate({}, queryConfig);
    }
    fetchAllCategorySocioproServices(queryConfig, organisationServiceId) {
        return this.categorySocioproServiceService.findMany({
            organisationServiceId,
        }, queryConfig);
    }
    fetchCategorySocioproService(categorySocioproServiceId) {
        let _id = categorySocioproServiceId;
        return this.categorySocioproServiceService.findOneOrFail({ _id });
    }
    deleteCategorySocioproService(categorySocioproServiceId) {
        let _id = categorySocioproServiceId;
        return this.categorySocioproServiceService.deleteOne({ _id });
    }
    activateCategorySocioproService(categorySocioproServiceId) {
        let _id = categorySocioproServiceId;
        return this.categorySocioproServiceService.updateOne({ _id }, { activated: true, activatedAt: new Date() });
    }
    deactivateCategorySocioproService(categorySocioproServiceId) {
        let _id = categorySocioproServiceId;
        return this.categorySocioproServiceService.updateOne({ _id }, { activated: false, activatedAt: null });
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => category_sociopro_service_entity_1.CategorySocioproService),
    __param(0, (0, graphql_1.Args)({
        name: 'categorySocioproServiceInput',
        type: () => category_sociopro_service_input_1.CategorySocioproServiceInput,
    })),
    __param(1, (0, graphql_1.Args)({ name: 'categorySocioproId', type: () => graphql_1.ID })),
    __param(2, (0, graphql_1.Args)({ name: 'organisationServiceId', type: () => graphql_1.ID })),
    __param(3, (0, graphql_1.Args)({ name: 'eventId', type: () => graphql_1.ID, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CategorySocioproServiceResolver.prototype, "createCategorySocioproService", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({
        name: 'categorySocioproServiceInput',
        type: () => category_sociopro_service_update_input_1.CategorySocioproServiceUpdateInput,
    })),
    __param(1, (0, graphql_1.Args)({ name: 'categorySocioproServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CategorySocioproServiceResolver.prototype, "updateCategorySocioproService", null);
__decorate([
    (0, graphql_1.Query)((returns) => category_sociopro_service_entity_1.PaginatedCategorySocioproServiceResult),
    __param(0, (0, graphql_1.Args)({
        name: 'queryConfig',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_data_config_input_1.QueryDataConfigInput]),
    __metadata("design:returntype", Promise)
], CategorySocioproServiceResolver.prototype, "fetchCategorySocioproServices", null);
__decorate([
    (0, graphql_1.Query)((returns) => [category_sociopro_service_entity_1.CategorySocioproService]),
    __param(0, (0, graphql_1.Args)({
        name: 'queryConfig',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __param(1, (0, graphql_1.Args)({ name: 'organisationServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_data_config_input_1.QueryDataConfigInput, String]),
    __metadata("design:returntype", Promise)
], CategorySocioproServiceResolver.prototype, "fetchAllCategorySocioproServices", null);
__decorate([
    (0, graphql_1.Query)((returns) => category_sociopro_service_entity_1.CategorySocioproService),
    __param(0, (0, graphql_1.Args)({ name: 'categorySocioproServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategorySocioproServiceResolver.prototype, "fetchCategorySocioproService", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'categorySocioproServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategorySocioproServiceResolver.prototype, "deleteCategorySocioproService", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'categorySocioproServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategorySocioproServiceResolver.prototype, "activateCategorySocioproService", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'categorySocioproServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategorySocioproServiceResolver.prototype, "deactivateCategorySocioproService", null);
CategorySocioproServiceResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [category_sociopro_service_service_1.CategorySocioproServiceService,
        category_sociopro_service_1.CategorySocioproService,
        organisation_service_service_1.OrganisationServiceService,
        event_service_1.EventService])
], CategorySocioproServiceResolver);
exports.CategorySocioproServiceResolver = CategorySocioproServiceResolver;
//# sourceMappingURL=category-sociopro-service.resolver.js.map
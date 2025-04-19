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
exports.CategorySocioproResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const query_data_config_input_1 = require("../../commons/graphql/query-data-config.input");
const category_sociopro_entity_1 = require("../dto/category-sociopro.entity");
const category_sociopro_input_1 = require("../dto/category-sociopro.input");
const category_sociopro_update_input_1 = require("../dto/category-sociopro.update.input");
const category_sociopro_service_1 = require("../services/category-sociopro.service");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/auth.guard");
const organization_service_1 = require("../../organization/services/organization.service");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const user_service_1 = require("../../users/user.service");
const bson_1 = require("bson");
const category_sociopro_service_service_1 = require("../../category-sociopro-service/services/category-sociopro-service.service");
let CategorySocioproResolver = class CategorySocioproResolver {
    constructor(categorySocioproService, categorySocioproServiceService, organizationService, collaboratorService) {
        this.categorySocioproService = categorySocioproService;
        this.categorySocioproServiceService = categorySocioproServiceService;
        this.organizationService = organizationService;
        this.collaboratorService = collaboratorService;
    }
    async createCategorySociopro(categorySocioproInput, organizationId) {
        const organisation = await this.organizationService.findOneByIdOrFail(organizationId);
        categorySocioproInput.organizationId = organizationId;
        return this.categorySocioproService.insertOne(categorySocioproInput);
    }
    updateCategorySociopro(categorySocioproInput, categorySocioproId) {
        return this.categorySocioproService.updateOneById(categorySocioproId, categorySocioproInput);
    }
    fetchCategorySociopros(queryConfig, user) {
        return this.categorySocioproService.findManyAndPaginate({
            organizationId: user.organization,
        }, queryConfig);
    }
    fetchAllCategorySociopros(queryConfig, user) {
        return this.categorySocioproService.findMany({
            organizationId: user.organization,
        }, queryConfig);
    }
    fetchCategorySociopro(categorySocioproId) {
        let _id = categorySocioproId;
        return this.categorySocioproService.findOneOrFail({ _id });
    }
    async deleteCategorySociopro(categorySocioproId) {
        const categorySocioPro = new bson_1.ObjectId(categorySocioproId);
        const isUseByCollaborator = await this.collaboratorService.findOne({
            categorySocioPro,
        });
        if (isUseByCollaborator)
            throw new Error('Impossible de supprimer cette catégorie, elle est utilisée par un ou plusieurs collaborateurs');
        const isUseByOrganisationService = await this.categorySocioproServiceService.findOne({
            categorySocioproId: categorySocioPro,
        });
        if (isUseByOrganisationService)
            throw new Error('Impossible de supprimer cette catégorie, elle est utilisée par un ou plusieurs services');
        let _id = categorySocioproId;
        return this.categorySocioproService.deleteOne({ _id });
    }
    activateCategorySociopro(categorySocioproId, activatedAt) {
        let _id = categorySocioproId;
        return this.categorySocioproService.updateOne({ _id }, {
            activated: true,
            activatedAt: activatedAt || new Date(),
        });
    }
    deactivateCategorySociopro(categorySocioproId) {
        let _id = categorySocioproId;
        return this.categorySocioproService.updateOne({ _id }, { activated: false, activatedAt: null });
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => category_sociopro_entity_1.CategorySociopro),
    __param(0, (0, graphql_1.Args)({ name: 'categorySocioproInput', type: () => category_sociopro_input_1.CategorySocioproInput })),
    __param(1, (0, graphql_1.Args)({ name: 'organizationId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CategorySocioproResolver.prototype, "createCategorySociopro", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({
        name: 'categorySocioproInput',
        type: () => category_sociopro_update_input_1.CategorySocioproUpdateInput,
    })),
    __param(1, (0, graphql_1.Args)({ name: 'categorySocioproId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CategorySocioproResolver.prototype, "updateCategorySociopro", null);
__decorate([
    (0, graphql_1.Query)((returns) => category_sociopro_entity_1.PaginatedCategorySocioproResult),
    __param(0, (0, graphql_1.Args)({
        name: 'queryConfig',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_data_config_input_1.QueryDataConfigInput, Object]),
    __metadata("design:returntype", Promise)
], CategorySocioproResolver.prototype, "fetchCategorySociopros", null);
__decorate([
    (0, graphql_1.Query)((returns) => [category_sociopro_entity_1.CategorySociopro]),
    __param(0, (0, graphql_1.Args)({
        name: 'queryConfig',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_data_config_input_1.QueryDataConfigInput, Object]),
    __metadata("design:returntype", Promise)
], CategorySocioproResolver.prototype, "fetchAllCategorySociopros", null);
__decorate([
    (0, graphql_1.Query)((returns) => category_sociopro_entity_1.CategorySociopro),
    __param(0, (0, graphql_1.Args)({ name: 'categorySocioproId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategorySocioproResolver.prototype, "fetchCategorySociopro", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'categorySocioproId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategorySocioproResolver.prototype, "deleteCategorySociopro", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'categorySocioproId', type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)({ name: 'activatedAt', type: () => Date, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date]),
    __metadata("design:returntype", Promise)
], CategorySocioproResolver.prototype, "activateCategorySociopro", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'categorySocioproId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategorySocioproResolver.prototype, "deactivateCategorySociopro", null);
CategorySocioproResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [category_sociopro_service_1.CategorySocioproService,
        category_sociopro_service_service_1.CategorySocioproServiceService,
        organization_service_1.OrganizationService,
        user_service_1.UserService])
], CategorySocioproResolver);
exports.CategorySocioproResolver = CategorySocioproResolver;
//# sourceMappingURL=category-sociopro.resolver.js.map
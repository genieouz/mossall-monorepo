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
exports.UserPropertyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const demande_service_1 = require("../../demande/services/demande.service");
const current_organization_decorator_1 = require("../../organization/decorators/current-organization.decorator");
const organization_entity_1 = require("../../organization/dto/organization.entity");
const organization_service_1 = require("../../organization/services/organization.service");
const user_entity_1 = require("../dto/user.entity");
const category_sociopro_service_1 = require("../../category-sociopro/services/category-sociopro.service");
const category_sociopro_entity_1 = require("../../category-sociopro/dto/category-sociopro.entity");
let UserPropertyResolver = class UserPropertyResolver {
    constructor(demandeService, organizationService, categorySocioProService) {
        this.demandeService = demandeService;
        this.organizationService = organizationService;
        this.categorySocioProService = categorySocioProService;
    }
    async authorizedAdvance(user) {
        return this.demandeService.maxAmountAuthorized(user);
    }
    async totalDemandeAmount(user) {
        return this.demandeService.getTotalDemandeAmount(user);
    }
    async balance(user) {
        return this.demandeService.getBalance(user);
    }
    async organization(user, organization) {
        return this.organizationService.findOneById(user.organization);
    }
    async categorySociopro(user) {
        return this.categorySocioProService.findOneById(user.categorySocioPro);
    }
};
__decorate([
    (0, graphql_1.ResolveField)((returns) => graphql_1.Float),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPropertyResolver.prototype, "authorizedAdvance", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => graphql_1.Float),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPropertyResolver.prototype, "totalDemandeAmount", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => graphql_1.Float),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPropertyResolver.prototype, "balance", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => organization_entity_1.Organization),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, current_organization_decorator_1.CurrentOrganization)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserPropertyResolver.prototype, "organization", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => category_sociopro_entity_1.CategorySociopro, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPropertyResolver.prototype, "categorySociopro", null);
UserPropertyResolver = __decorate([
    (0, graphql_1.Resolver)((of) => user_entity_1.User),
    __metadata("design:paramtypes", [demande_service_1.DemandeService,
        organization_service_1.OrganizationService,
        category_sociopro_service_1.CategorySocioproService])
], UserPropertyResolver);
exports.UserPropertyResolver = UserPropertyResolver;
//# sourceMappingURL=user-property.resolver.js.map
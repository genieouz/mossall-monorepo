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
exports.OrganizationResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const collaborators_service_1 = require("../../collaborators/collaborators.service");
const demandes_metrics_input_1 = require("../../demande/dto/demandes-metrics.input");
const user_entity_1 = require("../../users/dto/user.entity");
const user_service_1 = require("../../users/user.service");
const current_organization_decorator_1 = require("../decorators/current-organization.decorator");
const organization_entity_1 = require("../dto/organization.entity");
const organization_input_1 = require("../dto/organization.input");
const organization_update_input_1 = require("../dto/organization.update.input");
const organization_type_enum_1 = require("../enums/organization-type.enum");
const organization_service_1 = require("../services/organization.service");
const auth_guard_1 = require("../../auth/auth.guard");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
const query_data_config_input_1 = require("../../commons/graphql/query-data-config.input");
let OrganizationResolver = class OrganizationResolver {
    constructor(organizationService, collaboratorService, userService) {
        this.organizationService = organizationService;
        this.collaboratorService = collaboratorService;
        this.userService = userService;
    }
    createOrganization(organizationInput) {
        return this.organizationService.createOrganization(organizationInput);
    }
    createFinancialOrganization(organizationInput) {
        return this.organizationService.createOrganization(organizationInput, organization_type_enum_1.OrganizationType.FINANCIAL);
    }
    updateOrganization(organizationInput, organizationId) {
        return this.organizationService.updateOneById(organizationId, organizationInput);
    }
    fetchOrganizations() {
        return this.organizationService.findMany({});
    }
    fetchOrganization(organizationId) {
        return this.organizationService.findOneByIdOrFail(organizationId);
    }
    async fetchOrganizationCollaborators(demandesMetricsInput = {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2030-12-31'),
    }, org) {
        return this.userService.fetchMyCollaborators(org._id, demandesMetricsInput);
    }
    async fetchPaginatedOrganisationCol(demandesMetricsInput = {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2030-12-31'),
    }, org) {
        let endDate = new Date(demandesMetricsInput.endDate);
        endDate.setDate(endDate.getDate() + 1);
        return this.userService.findManyAndPaginate({
            role: user_role_enum_1.UserRole.COLLABORATOR,
            organization: org.id,
            createdAt: {
                $gte: new Date(demandesMetricsInput.startDate),
                $lt: endDate,
            },
        });
    }
    async fetchPaginatedOrganizationCollaborators(demandesMetricsInput = {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2030-12-31'),
    }, org, queryDataConfig, hasPendingDemandes) {
        let endDate = new Date(demandesMetricsInput.endDate);
        endDate.setDate(endDate.getDate() + 1);
        const queryFilter = {
            role: user_role_enum_1.UserRole.COLLABORATOR,
            organization: { $in: [org._id, String(org._id)] },
            createdAt: {
                $gte: new Date(demandesMetricsInput.startDate),
                $lt: endDate,
            },
        };
        if (hasPendingDemandes) {
            return this.userService.fetchCollaboratorsThatHasPendingDemandes(queryDataConfig, queryFilter);
        }
        return this.userService.findManyAndPaginate(queryFilter, queryDataConfig);
    }
    async fetchOrganizationAdmins(org) {
        return this.userService.fetchMyAdmins(org.id);
    }
    fetchPaginatedOrganisationAdmins(demandesMetricsInput = {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2030-12-31'),
    }, org, queryDataConfig) {
        let endDate = new Date(demandesMetricsInput.endDate);
        endDate.setDate(endDate.getDate() + 1);
        const queryFilter = {
            role: user_role_enum_1.UserRole.ADMIN,
            organization: { $in: [org._id, String(org._id)] },
            createdAt: {
                $gte: new Date(demandesMetricsInput.startDate),
                $lt: endDate,
            },
        };
        return this.userService.findManyAndPaginate(queryFilter, queryDataConfig);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => organization_entity_1.Organization),
    __param(0, (0, graphql_1.Args)({ name: 'organizationInput', type: () => organization_input_1.OrganizationInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "createOrganization", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => organization_entity_1.Organization),
    __param(0, (0, graphql_1.Args)({ name: 'organizationInput', type: () => organization_input_1.OrganizationInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "createFinancialOrganization", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'organizationInput', type: () => organization_update_input_1.OrganizationUpdateInput })),
    __param(1, (0, graphql_1.Args)({ name: 'organizationId', type: () => graphql_2.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "updateOrganization", null);
__decorate([
    (0, graphql_1.Query)((returns) => [organization_entity_1.Organization]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "fetchOrganizations", null);
__decorate([
    (0, graphql_1.Query)((returns) => organization_entity_1.Organization),
    __param(0, (0, graphql_1.Args)({ name: 'organizationId', type: () => graphql_2.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "fetchOrganization", null);
__decorate([
    (0, graphql_1.Query)((returns) => [user_entity_1.User]),
    __param(0, (0, graphql_1.Args)({
        name: 'metricsInput',
        type: () => demandes_metrics_input_1.DemandesMetricsInput,
        nullable: true,
    })),
    __param(1, (0, current_organization_decorator_1.CurrentOrganization)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [demandes_metrics_input_1.DemandesMetricsInput, Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "fetchOrganizationCollaborators", null);
__decorate([
    (0, graphql_1.Query)((returns) => user_entity_1.PaginatedUserResult),
    __param(0, (0, graphql_1.Args)({
        name: 'metricsInput',
        type: () => demandes_metrics_input_1.DemandesMetricsInput,
        nullable: true,
    })),
    __param(1, (0, current_organization_decorator_1.CurrentOrganization)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [demandes_metrics_input_1.DemandesMetricsInput, Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "fetchPaginatedOrganisationCol", null);
__decorate([
    (0, graphql_1.Query)((returns) => user_entity_1.PaginatedUserResult),
    __param(0, (0, graphql_1.Args)({
        name: 'metricsInput',
        type: () => demandes_metrics_input_1.DemandesMetricsInput,
        nullable: true,
    })),
    __param(1, (0, current_organization_decorator_1.CurrentOrganization)()),
    __param(2, (0, graphql_1.Args)({
        name: 'queryFilter',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __param(3, (0, graphql_1.Args)({
        name: 'hasPendingDemandes',
        type: () => Boolean,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [demandes_metrics_input_1.DemandesMetricsInput, Object, query_data_config_input_1.QueryDataConfigInput, Boolean]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "fetchPaginatedOrganizationCollaborators", null);
__decorate([
    (0, graphql_1.Query)((returns) => [user_entity_1.User]),
    __param(0, (0, current_organization_decorator_1.CurrentOrganization)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "fetchOrganizationAdmins", null);
__decorate([
    (0, graphql_1.Query)((returns) => user_entity_1.PaginatedUserResult),
    __param(0, (0, graphql_1.Args)({
        name: 'metricsInput',
        type: () => demandes_metrics_input_1.DemandesMetricsInput,
        nullable: true,
    })),
    __param(1, (0, current_organization_decorator_1.CurrentOrganization)()),
    __param(2, (0, graphql_1.Args)({
        name: 'queryFilter',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [demandes_metrics_input_1.DemandesMetricsInput, Object, query_data_config_input_1.QueryDataConfigInput]),
    __metadata("design:returntype", void 0)
], OrganizationResolver.prototype, "fetchPaginatedOrganisationAdmins", null);
OrganizationResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService,
        collaborators_service_1.CollaboratorsService,
        user_service_1.UserService])
], OrganizationResolver);
exports.OrganizationResolver = OrganizationResolver;
//# sourceMappingURL=organization.resolver.js.map
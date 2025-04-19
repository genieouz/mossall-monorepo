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
exports.DemandeResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const current_organization_decorator_1 = require("../../organization/decorators/current-organization.decorator");
const user_service_1 = require("../../users/user.service");
const demande_entity_1 = require("../dto/demande.entity");
const demandes_metrics_entity_1 = require("../dto/demandes-metrics.entity");
const demandes_metrics_input_1 = require("../dto/demandes-metrics.input");
const demande_service_1 = require("../services/demande.service");
const auth_guard_1 = require("../../auth/auth.guard");
const query_data_config_input_1 = require("../../commons/graphql/query-data-config.input");
const bson_1 = require("bson");
const order_by_direction_enum_1 = require("../../commons/graphql/enums/order-by-direction.enum");
const demande_status_enum_1 = require("../enums/demande-status.enum");
let DemandeResolver = class DemandeResolver {
    constructor(demandeService, userService) {
        this.demandeService = demandeService;
        this.userService = userService;
    }
    async cancelDemandeByAdmin(demandeId, user) {
        return this.demandeService.cancelByAdmin(demandeId, user);
    }
    async rejectDemandeByAdmin(demandeId, rejectedReason, user) {
        return this.demandeService.rejectByAdmin(demandeId, user, rejectedReason);
    }
    async validateDemande(demandeId, user) {
        return this.demandeService.validate(demandeId, user);
    }
    async payeDemande(demandeId, user) {
        return this.demandeService.paye(demandeId, user);
    }
    async fetchOrganizationDemandes(currentUser, metricsInput = {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2030-12-31'),
    }, org) {
        const queryFilter = {};
        let endDate = new Date(metricsInput.endDate);
        endDate.setDate(endDate.getDate() + 1);
        if (metricsInput.status) {
            queryFilter['status'] = metricsInput.status;
        }
        return (await this.demandeService.findMany(Object.assign({ organization: org._id, createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate } }, queryFilter))).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    async fetchPaginatedOrganizationDemandes(currentUser, metricsInput = {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2030-12-31'),
    }, org, queryDataConfig, organizationServiceId) {
        var _a;
        let endDate = new Date(metricsInput.endDate);
        endDate.setDate(endDate.getDate() + 1);
        const queryFilter = {
            organization: new bson_1.ObjectId(org.id),
            createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate },
        };
        if (metricsInput.status) {
            queryFilter['status'] = metricsInput.status;
        }
        if (metricsInput.minimum != null) {
            queryFilter.amount = { $gte: metricsInput.minimum };
        }
        if (metricsInput.maximum != null) {
            queryFilter.amount = {
                $gte: (_a = metricsInput === null || metricsInput === void 0 ? void 0 : metricsInput.minimum) !== null && _a !== void 0 ? _a : 0,
                $lte: metricsInput.maximum,
            };
        }
        queryDataConfig['orderBy'] = {
            property: 'createdAt',
            direction: order_by_direction_enum_1.OrderByDirection.DESC,
        };
        if (organizationServiceId) {
            queryFilter['organizationServiceId'] = new bson_1.ObjectId(organizationServiceId);
        }
        return this.demandeService.findManyAndPaginate(Object.assign({}, queryFilter), queryDataConfig);
    }
    async fetchDemandesByCollaborator(collaboratorId, status) {
        return this.demandeService.findByCollaborator(collaboratorId, status);
    }
    async fetchDemandesMetrics(user, demandesMetricsInput, org) {
        return this.demandeService.getDemandesMetrics(org.id, demandesMetricsInput);
    }
    async fetchSupportPaiement(org) {
        return this.demandeService.getSupportPaiement(org);
    }
    async fetchCountStatus(organisation, filter) {
        const query = {
            organization: organisation.id,
        };
        if ((filter === null || filter === void 0 ? void 0 : filter.startDate) && (filter === null || filter === void 0 ? void 0 : filter.endDate)) {
            query['createdAt'] = {
                $gte: new Date(filter.startDate),
                $lte: new Date(filter.endDate),
            };
        }
        const [pending, validated, rejected, payed, cancelled] = await Promise.all([
            this.demandeService.count(Object.assign({ status: demande_status_enum_1.DemandeStatus.PENDING }, query)),
            this.demandeService.count(Object.assign({ status: demande_status_enum_1.DemandeStatus.VALIDATED }, query)),
            this.demandeService.count(Object.assign({ status: demande_status_enum_1.DemandeStatus.REJECTED }, query)),
            this.demandeService.count(Object.assign({ status: demande_status_enum_1.DemandeStatus.PAYED }, query)),
            this.demandeService.count(Object.assign({ status: demande_status_enum_1.DemandeStatus.CANCELLED }, query)),
        ]);
        return {
            pending,
            validated,
            rejected,
            payed,
            cancelled,
        };
    }
    async fetchTotalDemandesAmount(org, status, filter) {
        const match = {
            organization: new bson_1.ObjectId(org.id),
        };
        if (status) {
            match['status'] = status;
        }
        if ((filter === null || filter === void 0 ? void 0 : filter.startDate) && (filter === null || filter === void 0 ? void 0 : filter.endDate)) {
            match['createdAt'] = {
                $gte: new Date(filter.startDate),
                $lte: new Date(filter.endDate),
            };
        }
        const result = await this.demandeService.aggregateOne([
            { $match: match },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' },
                },
            },
        ]);
        return result ? result.total : 0;
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'demandeId', type: () => graphql_2.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "cancelDemandeByAdmin", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'demandeId', type: () => graphql_2.ID })),
    __param(1, (0, graphql_1.Args)({ name: 'rejectedReason', type: () => String })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "rejectDemandeByAdmin", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'demandeId', type: () => graphql_2.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "validateDemande", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'demandeId', type: () => graphql_2.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "payeDemande", null);
__decorate([
    (0, graphql_1.Query)((returns) => [demande_entity_1.Demande]),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'metricsInput',
        type: () => demandes_metrics_input_1.DemandesMetricsInput,
        nullable: true,
    })),
    __param(2, (0, current_organization_decorator_1.CurrentOrganization)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, demandes_metrics_input_1.DemandesMetricsInput, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "fetchOrganizationDemandes", null);
__decorate([
    (0, graphql_1.Query)((returns) => demande_entity_1.PaginatedDemandeResult),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'metricsInput',
        type: () => demandes_metrics_input_1.DemandesMetricsInput,
        nullable: true,
    })),
    __param(2, (0, current_organization_decorator_1.CurrentOrganization)()),
    __param(3, (0, graphql_1.Args)({
        name: 'queryFilter',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __param(4, (0, graphql_1.Args)({
        name: 'organizationServiceId',
        type: () => String,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, demandes_metrics_input_1.DemandesMetricsInput, Object, query_data_config_input_1.QueryDataConfigInput, String]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "fetchPaginatedOrganizationDemandes", null);
__decorate([
    (0, graphql_1.Query)((returns) => [demande_entity_1.Demande]),
    __param(0, (0, graphql_1.Args)({ name: 'collaboratorId', type: () => graphql_2.ID })),
    __param(1, (0, graphql_1.Args)({ name: 'status', type: () => demande_status_enum_1.DemandeStatus, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "fetchDemandesByCollaborator", null);
__decorate([
    (0, graphql_1.Query)((returns) => demandes_metrics_entity_1.DemandesMetrics),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)({ name: 'metricsInput', type: () => demandes_metrics_input_1.DemandesMetricsInput })),
    __param(2, (0, current_organization_decorator_1.CurrentOrganization)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, demandes_metrics_input_1.DemandesMetricsInput, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "fetchDemandesMetrics", null);
__decorate([
    (0, graphql_1.Query)((returns) => [demande_entity_1.Demande]),
    __param(0, (0, current_organization_decorator_1.CurrentOrganization)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "fetchSupportPaiement", null);
__decorate([
    (0, graphql_1.Query)((returns) => demande_entity_1.CountStatusDemande),
    __param(0, (0, current_organization_decorator_1.CurrentOrganization)()),
    __param(1, (0, graphql_1.Args)({ name: 'filter', type: () => demandes_metrics_input_1.DemandesMetricsInput, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, demandes_metrics_input_1.DemandesMetricsInput]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "fetchCountStatus", null);
__decorate([
    (0, graphql_1.Query)((returns) => graphql_1.Float, { nullable: true }),
    __param(0, (0, current_organization_decorator_1.CurrentOrganization)()),
    __param(1, (0, graphql_1.Args)({ name: 'status', type: () => demande_status_enum_1.DemandeStatus, nullable: true })),
    __param(2, (0, graphql_1.Args)({ name: 'filter', type: () => demandes_metrics_input_1.DemandesMetricsInput, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, demandes_metrics_input_1.DemandesMetricsInput]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "fetchTotalDemandesAmount", null);
DemandeResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [demande_service_1.DemandeService,
        user_service_1.UserService])
], DemandeResolver);
exports.DemandeResolver = DemandeResolver;
//# sourceMappingURL=demande.resolver.js.map
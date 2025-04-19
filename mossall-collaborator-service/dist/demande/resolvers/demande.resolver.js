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
const user_service_1 = require("../../users/user.service");
const demande_metrics_entity_1 = require("../dto/demande-metrics.entity");
const demande_entity_1 = require("../dto/demande.entity");
const demande_input_1 = require("../dto/demande.input");
const demande_update_input_1 = require("../dto/demande.update.input");
const demande_service_1 = require("../services/demande.service");
const auth_guard_1 = require("../../auth/auth.guard");
const demande_constant_1 = require("../demande.constant");
let DemandeResolver = class DemandeResolver {
    constructor(demandeService, userService) {
        this.demandeService = demandeService;
        this.userService = userService;
    }
    async addDemande(demandeInput, currentUser) {
        return this.demandeService.create(demandeInput, currentUser);
    }
    async updateDemande(demandeInput, demandeId, currentUser) {
        return this.demandeService.update(demandeId, demandeInput, currentUser);
    }
    async cancelDemande(demandeId, currentUser) {
        return this.demandeService.cancel(demandeId, currentUser);
    }
    async fetchMyDemandesMetrics(metricsFilter = {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2030-12-31'),
    }, currentUser) {
        return this.demandeService.getMyDemandesMetrics(metricsFilter, currentUser._id);
    }
    async checkMyDemandeFees(amount, currentUser) {
        return amount * demande_constant_1.WaveFees;
    }
    fetchMyDemandes(currentUser) {
        return this.demandeService.findMany({ owner: currentUser._id });
    }
    fetchMyDemande(demandeId, currentUser) {
        return this.demandeService.findOneOrFail({
            _id: demandeId,
            owner: currentUser._id,
        });
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => demande_entity_1.Demande),
    __param(0, (0, graphql_1.Args)({ name: 'demandeInput', type: () => demande_input_1.DemandeInput })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "addDemande", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'demandeInput', type: () => demande_update_input_1.DemandeUpdateInput })),
    __param(1, (0, graphql_1.Args)({ name: 'demandeId', type: () => graphql_2.ID })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "updateDemande", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'demandeId', type: () => graphql_2.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "cancelDemande", null);
__decorate([
    (0, graphql_1.Query)((returns) => [demande_metrics_entity_1.DemandeMetric]),
    __param(0, (0, graphql_1.Args)({ name: 'metricsFilter', type: () => demande_metrics_entity_1.DemandeMetricFilter })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [demande_metrics_entity_1.DemandeMetricFilter, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "fetchMyDemandesMetrics", null);
__decorate([
    (0, graphql_1.Query)((returns) => graphql_1.Float),
    __param(0, (0, graphql_1.Args)({ name: 'demandeAmount', type: () => graphql_1.Float })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "checkMyDemandeFees", null);
__decorate([
    (0, graphql_1.Query)((returns) => [demande_entity_1.Demande]),
    __param(0, (0, current_user_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "fetchMyDemandes", null);
__decorate([
    (0, graphql_1.Query)((returns) => demande_entity_1.Demande),
    __param(0, (0, graphql_1.Args)({ name: 'demandeId', type: () => graphql_2.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DemandeResolver.prototype, "fetchMyDemande", null);
DemandeResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [demande_service_1.DemandeService,
        user_service_1.UserService])
], DemandeResolver);
exports.DemandeResolver = DemandeResolver;
//# sourceMappingURL=demande.resolver.js.map
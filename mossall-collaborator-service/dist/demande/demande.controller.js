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
exports.DemandeController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const demandes_metrics_input_1 = require("./dto/demandes-metrics.input");
const demande_service_1 = require("./services/demande.service");
let DemandeController = class DemandeController {
    constructor(demandeService) {
        this.demandeService = demandeService;
    }
    fetchUserDemandes(userId) {
        return this.demandeService.findMany({ owner: userId });
    }
    fetchOrganizationDemandes(organizationId, metricsInput) {
        let endDate = new Date(metricsInput.endDate);
        endDate.setDate(endDate.getDate() + 1);
        console.log({ $gte: new Date(metricsInput.startDate), $lt: endDate });
        return this.demandeService.findMany({
            organization: organizationId,
            createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate }
        });
    }
    validateDemande(demandeId, admin) {
        return this.demandeService.validate(demandeId, admin);
    }
    payeDemande(demandeId, admin) {
        return this.demandeService.paye(demandeId, admin);
    }
    async fetchDemandesMetrics(admin, metricsInput) {
        return this.demandeService.getDemandesMetrics(admin, metricsInput);
    }
};
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, nest_keycloak_connect_1.Public)(),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemandeController.prototype, "fetchUserDemandes", null);
__decorate([
    (0, common_1.Post)('organization/:organizationId'),
    (0, nest_keycloak_connect_1.Public)(),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Body)('metricsInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, demandes_metrics_input_1.DemandesMetricsInput]),
    __metadata("design:returntype", void 0)
], DemandeController.prototype, "fetchOrganizationDemandes", null);
__decorate([
    (0, common_1.Post)('validate'),
    (0, nest_keycloak_connect_1.Public)(),
    __param(0, (0, common_1.Body)('demandeId')),
    __param(1, (0, common_1.Body)('admin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DemandeController.prototype, "validateDemande", null);
__decorate([
    (0, common_1.Post)('paye'),
    (0, nest_keycloak_connect_1.Public)(),
    __param(0, (0, common_1.Body)('demandeId')),
    __param(1, (0, common_1.Body)('admin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DemandeController.prototype, "payeDemande", null);
__decorate([
    (0, common_1.Post)('metrics'),
    (0, nest_keycloak_connect_1.Public)(),
    __param(0, (0, common_1.Body)('admin')),
    __param(1, (0, common_1.Body)('metricsInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, demandes_metrics_input_1.DemandesMetricsInput]),
    __metadata("design:returntype", Promise)
], DemandeController.prototype, "fetchDemandesMetrics", null);
DemandeController = __decorate([
    (0, common_1.Controller)('demande'),
    __metadata("design:paramtypes", [demande_service_1.DemandeService])
], DemandeController);
exports.DemandeController = DemandeController;
//# sourceMappingURL=demande.controller.js.map
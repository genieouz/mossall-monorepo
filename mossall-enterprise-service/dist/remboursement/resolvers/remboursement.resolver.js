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
exports.RemboursementResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_guard_1 = require("../../auth/auth.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const remboursement_service_1 = require("../services/remboursement.service");
const remboursement_entity_1 = require("../dto/remboursement.entity");
let RemboursementResolver = class RemboursementResolver {
    constructor(rembourserService) {
        this.rembourserService = rembourserService;
    }
    async validateRemboursement(remboursementId, user) {
        return this.rembourserService.validate(remboursementId, user);
    }
    async myRemboursements(user) {
        return this.rembourserService.findMany({ userId: user._id });
    }
    async fetchRemboursementByUserId(userId) {
        return this.rembourserService.findMany({ userId });
    }
    async fetchAllRemboursements() {
        return this.rembourserService.findMany();
    }
    async fetchRemboursementsByDemande(demandeId) {
        return this.rembourserService.findMany({ demandeId });
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'remboursementId', type: () => graphql_1.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RemboursementResolver.prototype, "validateRemboursement", null);
__decorate([
    (0, graphql_1.Query)((returns) => [remboursement_entity_1.Remboursement]),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RemboursementResolver.prototype, "myRemboursements", null);
__decorate([
    (0, graphql_1.Query)((returns) => [remboursement_entity_1.Remboursement]),
    __param(0, (0, graphql_1.Args)({ name: 'userId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RemboursementResolver.prototype, "fetchRemboursementByUserId", null);
__decorate([
    (0, graphql_1.Query)((returns) => [remboursement_entity_1.Remboursement]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemboursementResolver.prototype, "fetchAllRemboursements", null);
__decorate([
    (0, graphql_1.Query)((returns) => [remboursement_entity_1.Remboursement]),
    __param(0, (0, graphql_1.Args)({ name: 'demandeId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RemboursementResolver.prototype, "fetchRemboursementsByDemande", null);
RemboursementResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [remboursement_service_1.RemboursementService])
], RemboursementResolver);
exports.RemboursementResolver = RemboursementResolver;
//# sourceMappingURL=remboursement.resolver.js.map
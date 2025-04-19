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
exports.RemboursementPropertyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const remboursement_entity_1 = require("../dto/remboursement.entity");
const demande_service_1 = require("../../demande/services/demande.service");
const demande_entity_1 = require("../../demande/dto/demande.entity");
const user_service_1 = require("../../users/user.service");
const user_entity_1 = require("../../users/dto/user.entity");
let RemboursementPropertyResolver = class RemboursementPropertyResolver {
    constructor(demandeService, userService) {
        this.demandeService = demandeService;
        this.userService = userService;
    }
    async demande(remboursement) {
        return this.demandeService.findOne({ _id: remboursement.demandeId });
    }
    async user(remboursement) {
        return this.userService.findOne({ _id: remboursement.userId });
    }
    async validatedBy(remboursement) {
        return this.userService.findOne({ _id: remboursement.validatedBy });
    }
};
__decorate([
    (0, graphql_1.ResolveField)((returns) => demande_entity_1.Demande, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RemboursementPropertyResolver.prototype, "demande", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => user_entity_1.User, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RemboursementPropertyResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => user_entity_1.User, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RemboursementPropertyResolver.prototype, "validatedBy", null);
RemboursementPropertyResolver = __decorate([
    (0, graphql_1.Resolver)((of) => remboursement_entity_1.Remboursement),
    __metadata("design:paramtypes", [demande_service_1.DemandeService,
        user_service_1.UserService])
], RemboursementPropertyResolver);
exports.RemboursementPropertyResolver = RemboursementPropertyResolver;
//# sourceMappingURL=remboursement-property.resolver.js.map
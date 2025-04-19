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
exports.CollaboratorsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const demande_service_1 = require("../demande/services/demande.service");
const wallet_enum_1 = require("../users/enums/wallet.enum");
const user_service_1 = require("../users/user.service");
const collaborators_service_1 = require("./collaborators.service");
const auth_guard_1 = require("../auth/auth.guard");
let CollaboratorsResolver = class CollaboratorsResolver {
    constructor(collaboratorsService, demandeService, userService) {
        this.collaboratorsService = collaboratorsService;
        this.demandeService = demandeService;
        this.userService = userService;
    }
    updateMyBankAccount(bankAccoutNumber, currentUser) {
        return this.collaboratorsService.updateBankAccountNumber(bankAccoutNumber, currentUser._id);
    }
    updateMyFavoriteWallet(favoriteWallet, currentUser) {
        return this.userService.updateOne({ id: currentUser._id }, { favoriteWallet });
    }
    async checkMyBalance(currentUser) {
        return this.demandeService.getBalance(currentUser);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'bankAccountNumber', type: () => String })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CollaboratorsResolver.prototype, "updateMyBankAccount", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'wallet', type: () => wallet_enum_1.Wallet })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CollaboratorsResolver.prototype, "updateMyFavoriteWallet", null);
__decorate([
    (0, graphql_1.Query)((returns) => graphql_1.Float),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollaboratorsResolver.prototype, "checkMyBalance", null);
CollaboratorsResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [collaborators_service_1.CollaboratorsService,
        demande_service_1.DemandeService,
        user_service_1.UserService])
], CollaboratorsResolver);
exports.CollaboratorsResolver = CollaboratorsResolver;
//# sourceMappingURL=collaborators.resolver.js.map
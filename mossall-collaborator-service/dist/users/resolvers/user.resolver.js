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
exports.UserResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const user_service_1 = require("../user.service");
const auth_guard_1 = require("../../auth/auth.guard");
const auth_service_1 = require("../../auth/auth.service");
let UserResolver = class UserResolver {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async requestResetCollaboratorPassword(oldPassword, currentUser) {
        return this.authService.requestResetPassword({
            email: currentUser.email,
            password: oldPassword,
        });
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => String, {
        description: 'Token to call reset password endpoint',
    }),
    __param(0, (0, graphql_1.Args)({ name: 'oldPassword', type: () => String })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "requestResetCollaboratorPassword", null);
UserResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map
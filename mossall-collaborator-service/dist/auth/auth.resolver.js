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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const login_input_1 = require("./dto/login.input");
const session_type_1 = require("./dto/session.type");
const reset_password_input_1 = require("./dto/reset-password.input");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async loginCollaborator(loginInput) {
        return this.authService.loginJWT(loginInput);
    }
    async resetCollaboratorPassword(resetPassword) {
        return this.authService.resetPassword(resetPassword);
    }
    async startForgotPassword(email) {
        return this.authService.startForgotPassword(email);
    }
    async refreshCollaboratorToken(refreshToken) {
        return this.authService.refreshToken(refreshToken);
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => session_type_1.Session),
    __param(0, (0, graphql_1.Args)({ name: 'loginInput', type: () => login_input_1.LoginInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "loginCollaborator", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'resetPasswordInput', type: () => reset_password_input_1.ResetPasswordInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_input_1.ResetPasswordInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "resetCollaboratorPassword", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'email', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "startForgotPassword", null);
__decorate([
    (0, graphql_1.Query)((returns) => session_type_1.Session),
    __param(0, (0, graphql_1.Args)({ name: 'refreshToken', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "refreshCollaboratorToken", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map
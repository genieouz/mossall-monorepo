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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../commons/utils");
const auth_service_1 = require("./auth.service");
const env_1 = require("../config/env");
const user_service_1 = require("../users/user.service");
let AuthGuard = class AuthGuard {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async canActivate(context) {
        const request = (0, utils_1.getRequestFromContext)(context);
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const tempData = await this.authService.decodeToken(token, env_1.JWT_SECRET);
            if (!tempData || !tempData.user) {
                throw new common_1.UnauthorizedException();
            }
            const data = await this.userService.findOne({
                email: tempData.user.email,
                blocked: { $ne: true },
            });
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
            delete data.password;
            request['user'] = data;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map
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
const core_1 = require("@nestjs/core");
const collab_api_decorator_1 = require("./decorators/collab-api.decorator");
let AuthGuard = class AuthGuard {
    constructor(authService, userService, reflector) {
        this.authService = authService;
        this.userService = userService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isCollabApi = this.reflector.getAllAndOverride(collab_api_decorator_1.IS_COLLAB_API, [context.getHandler(), context.getClass()]);
        const request = (0, utils_1.getRequestFromContext)(context);
        const apiKey = request.headers['x-api-key'];
        console.log('Start use api key', apiKey);
        console.log({ apiKey, COLLABORATOR_SERVICE_USED_KEY: env_1.COLLABORATOR_SERVICE_USED_KEY });
        if (apiKey &&
            env_1.COLLABORATOR_SERVICE_USED_KEY &&
            apiKey == env_1.COLLABORATOR_SERVICE_USED_KEY)
            return true;
        console.log('Key not valid or variable not set');
        if (isCollabApi)
            return true;
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.authService.decodeToken(token, env_1.JWT_SECRET);
            if (!payload || !payload.user) {
                throw new common_1.UnauthorizedException();
            }
            const data = await this.userService.findOne({
                email: payload.user.email,
                blocked: { $ne: true },
            });
            console.log('Data', data);
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
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
        user_service_1.UserService,
        core_1.Reflector])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map
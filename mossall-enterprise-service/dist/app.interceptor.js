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
exports.AppInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_1 = require("./commons/utils");
const organization_service_1 = require("./organization/services/organization.service");
const user_service_1 = require("./users/user.service");
let AppInterceptor = class AppInterceptor {
    constructor(userService, organizationService) {
        this.userService = userService;
        this.organizationService = organizationService;
    }
    intercept(context, next) {
        const req = (0, utils_1.getRequestFromContext)(context);
        return (0, rxjs_1.from)(this.addCustomDataToRequest(req)).pipe((0, operators_1.switchMap)(() => next.handle()));
    }
    async addCustomDataToRequest(request) {
        var _a;
        if (request.user) {
            const user = await this.userService.findById((_a = request === null || request === void 0 ? void 0 : request.user) === null || _a === void 0 ? void 0 : _a._id);
            const org = await this.organizationService.findOneById(user === null || user === void 0 ? void 0 : user.organization);
            request.organization = org;
            request.internalUser = user;
        }
    }
};
AppInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        organization_service_1.OrganizationService])
], AppInterceptor);
exports.AppInterceptor = AppInterceptor;
//# sourceMappingURL=app.interceptor.js.map
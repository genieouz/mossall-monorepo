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
exports.AppMiddleware = void 0;
const common_1 = require("@nestjs/common");
const organization_service_1 = require("./organization/services/organization.service");
const user_service_1 = require("./users/user.service");
let AppMiddleware = class AppMiddleware {
    constructor(userService, organizationService) {
        this.userService = userService;
        this.organizationService = organizationService;
    }
    async use(req, res, next) {
        var _a;
        const user = await this.userService.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub);
        const org = await this.organizationService.findOneById(user === null || user === void 0 ? void 0 : user.organization);
        console.log({ interceptor: org });
        req.organization = org;
        next();
    }
};
AppMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        organization_service_1.OrganizationService])
], AppMiddleware);
exports.AppMiddleware = AppMiddleware;
//# sourceMappingURL=app.middleware.js.map
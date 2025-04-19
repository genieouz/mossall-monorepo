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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const demande_service_1 = require("../demande/services/demande.service");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(demandeService, userService) {
        this.demandeService = demandeService;
        this.userService = userService;
    }
    async getCollaboratorBalance(userId) {
        const user = await this.userService.findById(userId);
        return this.demandeService.getBalance(user);
    }
};
__decorate([
    (0, nest_keycloak_connect_1.Public)(),
    (0, common_1.Get)(':id/balance'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCollaboratorBalance", null);
UserController = __decorate([
    (0, common_1.Controller)('collaborator'),
    __metadata("design:paramtypes", [demande_service_1.DemandeService,
        user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
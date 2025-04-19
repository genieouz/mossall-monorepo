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
exports.OrganizationController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const organization_service_1 = require("./services/organization.service");
const swagger_1 = require("@nestjs/swagger");
const organization_entity_1 = require("./dto/organization.entity");
let OrganizationController = class OrganizationController {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    async fetchOrganizationById(id) {
        console.log({ id });
        const result = await this.organizationService.findOneByIdOrFail(id);
        return Object.assign(Object.assign({}, result.toObject()), { id: result._id });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'get one organization' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'get organization by id',
        type: organization_entity_1.Organization,
    }),
    (0, nest_keycloak_connect_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "fetchOrganizationById", null);
OrganizationController = __decorate([
    (0, swagger_1.ApiTags)('organization'),
    (0, common_1.Controller)('organization'),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationController);
exports.OrganizationController = OrganizationController;
//# sourceMappingURL=organization.controller.js.map
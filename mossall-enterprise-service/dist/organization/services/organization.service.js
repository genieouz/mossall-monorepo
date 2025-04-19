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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_service_1 = require("../../auth/auth.service");
const abstract_service_1 = require("../../commons/abstract/abstract.service");
const utils_1 = require("../../commons/utils");
const env_1 = require("../../config/env");
const organization_model_name_1 = require("../schemas/organization.model-name");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_service_1 = require("../../users/user.service");
const organization_type_enum_1 = require("../enums/organization-type.enum");
const bson_1 = require("bson");
let OrganizationService = class OrganizationService extends abstract_service_1.AbstractService {
    constructor(model, eventEmitter, userSerive, authService) {
        super(model);
        this.model = model;
        this.eventEmitter = eventEmitter;
        this.userSerive = userSerive;
        this.authService = authService;
    }
    async createOrganization(payload, type = organization_type_enum_1.OrganizationType.DEFAULT) {
        const realm = env_1.KEYCLOAK_ENTERPRISE_REALM;
        const password = (0, utils_1.generatePassword)(12, {
            numbers: true,
            uppercase: true,
            symbols: true,
        });
        const newUserData = {
            email: payload.rootEmail,
            firstName: payload.rootFirstname,
            lastName: payload.rootLastname,
        };
        const hasedPassword = this.authService.hashPassword(password);
        const rootUser = await this.userSerive.insertOne(Object.assign(Object.assign({}, newUserData), { password: hasedPassword, organization: new bson_1.ObjectId(), role: type === organization_type_enum_1.OrganizationType.FINANCIAL
                ? 'SUPER_ADMIN_FINANCE'
                : 'SUPER_ADMIN_ORG', realm }));
        const organization = await this.insertOne({
            name: payload.name,
            rootUser: rootUser.id,
            rootEmail: payload.rootEmail,
        });
        await this.userSerive.updateOneById(rootUser.id, {
            organization: organization.id,
        });
        this.eventEmitter.emit('organization.created', {
            email: payload.rootEmail,
            password,
            frontUrl: env_1.ADMIN_FRONT_URL,
        });
        return organization;
    }
};
OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(organization_model_name_1.organizationModelName)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        event_emitter_1.EventEmitter2,
        user_service_1.UserService,
        auth_service_1.AuthService])
], OrganizationService);
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organization.service.js.map
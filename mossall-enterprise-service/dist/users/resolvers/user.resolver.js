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
const user_entity_1 = require("../dto/user.entity");
const user_input_1 = require("../dto/user.input");
const user_service_1 = require("../user.service");
const current_organization_decorator_1 = require("../../organization/decorators/current-organization.decorator");
const auth_guard_1 = require("../../auth/auth.guard");
const user_role_enum_1 = require("../enums/user-role.enum");
const user_filter_1 = require("../dto/user.filter");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    updateMyAdminPassword(oldPassword, newPassword, user) {
        return this.userService.updateMyAdminPassword(user, oldPassword, newPassword);
    }
    async lockUser(userId, user) {
        const admin = await this.userService.findByIdOrFail(user._id);
        return this.userService.updateOne({ _id: userId, organization: admin.organization }, { blocked: true });
    }
    async unlockUser(userId, user) {
        const admin = await this.userService.findByIdOrFail(user._id);
        return this.userService.updateOne({ _id: userId, organization: admin.organization }, { blocked: false });
    }
    async enableEmailNotification(userId, org) {
        return this.userService.updateOne({ _id: userId, organization: org.id }, { enableEmailNotification: true });
    }
    async disableEmailNotification(userId, org) {
        return this.userService.updateOne({ _id: userId, organization: org.id }, { enableEmailNotification: false });
    }
    fetchCurrentAdmin(user) {
        return this.userService.findOneOrFail({ email: user.email });
    }
    updateMyAdminProfile(userInput, user) {
        return this.userService.updateMyProfile(user._id, userInput);
    }
    async phoneNumberExists(phoneNumber, userId, isAdmin, user) {
        const cu = await this.userService.findById(user._id);
        return this.userService.checkExistingFieldValue(cu.organization, 'phoneNumber', phoneNumber, isAdmin, userId);
    }
    async uniqueIdentifierExists(uniqueIdentifier, userId, isAdmin, user) {
        const cu = await this.userService.findById(user._id);
        return this.userService.checkExistingFieldValue(cu.organization, 'uniqueIdentifier', uniqueIdentifier, isAdmin, userId);
    }
    async bankAccountNumberExists(bankAccountNumber, userId, isAdmin, user) {
        const cu = await this.userService.findById(user._id);
        return this.userService.checkExistingFieldValue(cu.organization, 'bankAccountNumber', bankAccountNumber, isAdmin, userId);
    }
    async emailExists(email, userId, isAdmin, user) {
        return this.userService.checkExistingFieldValue(null, 'email', email, isAdmin, userId);
    }
    async upladFile(file, destination) {
        return true;
    }
    async fetchCollaboratorCount(org, filter) {
        const query = {
            organization: org.id,
            role: user_role_enum_1.UserRole.COLLABORATOR,
        };
        if (filter === null || filter === void 0 ? void 0 : filter.role) {
            query['role'] = filter.role;
        }
        if ((filter === null || filter === void 0 ? void 0 : filter.startDate) && (filter === null || filter === void 0 ? void 0 : filter.endDate)) {
            query['createdAt'] = {
                $gte: new Date(filter.startDate),
                $lt: new Date(filter.endDate),
            };
        }
        return this.userService.count(Object.assign({}, query));
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'oldPassword', type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: 'newPassword', type: () => String })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateMyAdminPassword", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'userId', type: () => String })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "lockUser", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'userId', type: () => String })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "unlockUser", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'userId', type: () => String })),
    __param(1, (0, current_organization_decorator_1.CurrentOrganization)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "enableEmailNotification", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'userId', type: () => String })),
    __param(1, (0, current_organization_decorator_1.CurrentOrganization)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "disableEmailNotification", null);
__decorate([
    (0, graphql_1.Query)((returns) => user_entity_1.User),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "fetchCurrentAdmin", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'userInput', type: () => user_input_1.UpdateMyAdminProfileInput })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UpdateMyAdminProfileInput, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateMyAdminProfile", null);
__decorate([
    (0, graphql_1.Query)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'phoneNumber', type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: 'userId', type: () => String, nullable: true })),
    __param(2, (0, graphql_1.Args)({ name: 'isAdmin', type: () => Boolean, nullable: true })),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "phoneNumberExists", null);
__decorate([
    (0, graphql_1.Query)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'uniqueIdentifier', type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: 'userId', type: () => String, nullable: true })),
    __param(2, (0, graphql_1.Args)({ name: 'isAdmin', type: () => Boolean, nullable: true })),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "uniqueIdentifierExists", null);
__decorate([
    (0, graphql_1.Query)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'bankAccountNumber', type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: 'userId', type: () => String, nullable: true })),
    __param(2, (0, graphql_1.Args)({ name: 'isAdmin', type: () => Boolean, nullable: true })),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "bankAccountNumberExists", null);
__decorate([
    (0, graphql_1.Query)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'email', type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: 'userId', type: () => String, nullable: true })),
    __param(2, (0, graphql_1.Args)({ name: 'isAdmin', type: () => Boolean, nullable: true })),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "emailExists", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'file', type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: 'destination', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "upladFile", null);
__decorate([
    (0, graphql_1.Query)((returns) => graphql_1.Float),
    __param(0, (0, current_organization_decorator_1.CurrentOrganization)()),
    __param(1, (0, graphql_1.Args)({ name: 'filter', type: () => user_filter_1.UserFilterInput, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_filter_1.UserFilterInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "fetchCollaboratorCount", null);
UserResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map
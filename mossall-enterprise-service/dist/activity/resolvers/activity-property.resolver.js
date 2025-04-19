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
exports.ActivityPropertyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const organization_entity_1 = require("../../organization/dto/organization.entity");
const organization_service_1 = require("../../organization/services/organization.service");
const user_entity_1 = require("../../users/dto/user.entity");
const user_service_1 = require("../../users/user.service");
const activity_entity_1 = require("../dto/activity.entity");
let ActivityPropertyResolver = class ActivityPropertyResolver {
    constructor(userService, organizationService) {
        this.userService = userService;
        this.organizationService = organizationService;
    }
    user(activity) {
        return this.userService.findOneById(activity.user);
    }
    organization(activity) {
        return this.organizationService.findOneById(activity.organization);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(returns => user_entity_1.User),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActivityPropertyResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.ResolveField)(returns => organization_entity_1.Organization),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActivityPropertyResolver.prototype, "organization", null);
ActivityPropertyResolver = __decorate([
    (0, graphql_1.Resolver)(of => activity_entity_1.Activity),
    __metadata("design:paramtypes", [user_service_1.UserService,
        organization_service_1.OrganizationService])
], ActivityPropertyResolver);
exports.ActivityPropertyResolver = ActivityPropertyResolver;
//# sourceMappingURL=activity-property.resolver.js.map
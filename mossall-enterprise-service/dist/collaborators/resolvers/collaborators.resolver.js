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
exports.CollaboratorResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const user_entity_1 = require("../../users/dto/user.entity");
const user_service_1 = require("../../users/user.service");
const collaborators_service_1 = require("../collaborators.service");
const invite_collaborator_input_1 = require("../dto/invite-collaborator.input");
const update_collaborator_input_1 = require("../dto/update-collaborator.input");
const auth_guard_1 = require("../../auth/auth.guard");
let CollaboratorResolver = class CollaboratorResolver {
    constructor(collaboratorService, userService) {
        this.collaboratorService = collaboratorService;
        this.userService = userService;
    }
    async inviteCollaborator(collaborator, categorySocioProId, user) {
        categorySocioProId = categorySocioProId || null;
        return this.collaboratorService.inviteCollaborator(collaborator, categorySocioProId, user._id);
    }
    async inviteAdmin(collaborator, user) {
        return this.collaboratorService.inviteAdmin(collaborator, user._id);
    }
    async updateCollaborator(collaborator, collaboratorId, categorySocioProId) {
        return this.collaboratorService.updateCollaborator(collaborator, collaboratorId, categorySocioProId);
    }
    async fetchOrganizationCollaborator(collaboratorId) {
        return this.userService.getUserById(collaboratorId);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'collaborator', type: () => invite_collaborator_input_1.InviteCollaboratorInput })),
    __param(1, (0, graphql_1.Args)({ name: 'categorySocioProId', type: () => String, nullable: true })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invite_collaborator_input_1.InviteCollaboratorInput, String, Object]),
    __metadata("design:returntype", Promise)
], CollaboratorResolver.prototype, "inviteCollaborator", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'admin', type: () => invite_collaborator_input_1.InviteCollaboratorInput })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invite_collaborator_input_1.InviteCollaboratorInput, Object]),
    __metadata("design:returntype", Promise)
], CollaboratorResolver.prototype, "inviteAdmin", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'collaborator', type: () => update_collaborator_input_1.UpdateCollaboratorInput })),
    __param(1, (0, graphql_1.Args)({ name: 'collaboratorId', type: () => String })),
    __param(2, (0, graphql_1.Args)({ name: 'categorySocioProId', type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_collaborator_input_1.UpdateCollaboratorInput, String, String]),
    __metadata("design:returntype", Promise)
], CollaboratorResolver.prototype, "updateCollaborator", null);
__decorate([
    (0, graphql_1.Query)((returns) => user_entity_1.User),
    __param(0, (0, graphql_1.Args)({ name: 'collaboratorId', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollaboratorResolver.prototype, "fetchOrganizationCollaborator", null);
CollaboratorResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [collaborators_service_1.CollaboratorsService,
        user_service_1.UserService])
], CollaboratorResolver);
exports.CollaboratorResolver = CollaboratorResolver;
//# sourceMappingURL=collaborators.resolver.js.map
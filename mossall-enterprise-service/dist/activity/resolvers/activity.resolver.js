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
exports.ActivityResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const auth_guard_1 = require("../../auth/auth.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const query_data_config_input_1 = require("../../commons/graphql/query-data-config.input");
const activity_entity_1 = require("../dto/activity.entity");
const activity_service_1 = require("../services/activity.service");
let ActivityResolver = class ActivityResolver {
    constructor(activitieservice) {
        this.activitieservice = activitieservice;
    }
    fetchPaginatedActivities(queryDataConfig, user) {
        return this.activitieservice.findManyAndPaginate({ organization: user.organization }, queryDataConfig);
    }
    fetchActivity(activityId) {
        return this.activitieservice.findOneByIdOrFail(activityId);
    }
};
__decorate([
    (0, graphql_1.Query)(returns => activity_entity_1.PaginatedActivityResult),
    __param(0, (0, graphql_1.Args)({ name: "queryFilter", type: () => query_data_config_input_1.QueryDataConfigInput, nullable: true })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_data_config_input_1.QueryDataConfigInput, Object]),
    __metadata("design:returntype", Promise)
], ActivityResolver.prototype, "fetchPaginatedActivities", null);
__decorate([
    (0, graphql_1.Query)(returns => activity_entity_1.Activity),
    __param(0, (0, graphql_1.Args)({ name: 'activityId', type: () => graphql_2.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActivityResolver.prototype, "fetchActivity", null);
ActivityResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [activity_service_1.Activitieservice])
], ActivityResolver);
exports.ActivityResolver = ActivityResolver;
//# sourceMappingURL=activity.resolver.js.map
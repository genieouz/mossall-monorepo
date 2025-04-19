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
exports.NotificationResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const user_service_1 = require("../../users/user.service");
const notification_entity_1 = require("../dto/notification.entity");
const notification_service_1 = require("../services/notification.service");
const auth_guard_1 = require("../../auth/auth.guard");
const query_data_config_input_1 = require("../../commons/graphql/query-data-config.input");
const demandes_metrics_input_1 = require("../../demande/dto/demandes-metrics.input");
let NotificationResolver = class NotificationResolver {
    constructor(notificationService, userService) {
        this.notificationService = notificationService;
        this.userService = userService;
    }
    async fetchOrganizationNotifications(user) {
        return this.notificationService.aggregateMany([
            {
                $match: { organization: user.organization },
            },
            {
                $set: {
                    viewedByMe: {
                        $cond: [{ $in: [user._id, '$viewedBy'] }, true, false],
                    },
                },
            },
            { $sort: { viewedByMe: -1, createdAt: -1 } },
        ]);
    }
    async viewOrganizationNotifications(user) {
        return this.notificationService.addToSetByFilter({ organization: user.organization }, 'viewedBy', user._id);
    }
    fetchPaginatedNotifications(user, queryDataConfig, metricsInput = {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2030-12-31'),
    }) {
        let endDate = new Date(metricsInput.endDate);
        endDate.setDate(endDate.getDate() + 1);
        return this.notificationService.findManyNotificationsAndPaginate(user, queryDataConfig);
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => [notification_entity_1.Notification]),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "fetchOrganizationNotifications", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "viewOrganizationNotifications", null);
__decorate([
    (0, graphql_1.Query)((returns) => notification_entity_1.PaginatedNotificationResult),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)({
        name: 'queryFilter',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'metricsInput',
        type: () => demandes_metrics_input_1.DemandesMetricsInput,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_data_config_input_1.QueryDataConfigInput,
        demandes_metrics_input_1.DemandesMetricsInput]),
    __metadata("design:returntype", void 0)
], NotificationResolver.prototype, "fetchPaginatedNotifications", null);
NotificationResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        user_service_1.UserService])
], NotificationResolver);
exports.NotificationResolver = NotificationResolver;
//# sourceMappingURL=notification.resolver.js.map
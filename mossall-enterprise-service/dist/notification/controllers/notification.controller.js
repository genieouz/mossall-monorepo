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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const notification_service_1 = require("../services/notification.service");
const swagger_1 = require("@nestjs/swagger");
const notification_entity_1 = require("../dto/notification.entity");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async createNotification(notificationInput) {
        return this.notificationService.create(notificationInput);
    }
    fetchNotifications() {
        return this.notificationService.findMany({});
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a notification' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The notifications has been successfully created.',
        type: notification_entity_1.Notification,
    }),
    (0, nest_keycloak_connect_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "createNotification", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'get multi notifications' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'get notifications',
        type: [notification_entity_1.Notification],
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "fetchNotifications", null);
NotificationController = __decorate([
    (0, swagger_1.ApiTags)('notifications'),
    (0, common_1.Controller)('notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map
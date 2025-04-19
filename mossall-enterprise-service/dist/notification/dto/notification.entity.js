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
exports.PaginatedNotificationResult = exports.Notification = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const pagination_1 = require("../../commons/graphql/pagination");
const timestamps_entity_1 = require("../../commons/graphql/types/timestamps/timestamps.entity");
const user_entity_1 = require("../../users/dto/user.entity");
let Notification = class Notification extends timestamps_entity_1.Timestamps {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'entity id' }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'notification title' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'notification content' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'notification author' }),
    (0, graphql_1.Field)((type) => user_entity_1.User),
    __metadata("design:type", Object)
], Notification.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'notification organization' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: 'notification viewed by me' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Notification.prototype, "viewedByMe", void 0);
Notification = __decorate([
    (0, graphql_1.ObjectType)()
], Notification);
exports.Notification = Notification;
let PaginatedNotificationResult = class PaginatedNotificationResult extends (0, pagination_1.PaginatedResult)(Notification) {
};
PaginatedNotificationResult = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedNotificationResult);
exports.PaginatedNotificationResult = PaginatedNotificationResult;
//# sourceMappingURL=notification.entity.js.map
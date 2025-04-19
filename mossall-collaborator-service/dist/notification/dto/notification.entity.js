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
exports.Notification = void 0;
const graphql_1 = require("@nestjs/graphql");
const timestamps_entity_1 = require("../../commons/graphql/types/timestamps/timestamps.entity");
const user_entity_1 = require("../../users/dto/user.entity");
let Notification = class Notification extends timestamps_entity_1.Timestamps {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "entityId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", Object)
], Notification.prototype, "by", void 0);
Notification = __decorate([
    (0, graphql_1.ObjectType)()
], Notification);
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../users/user.module");
const notification_controller_1 = require("./controllers/notification.controller");
const notification_resolver_1 = require("./resolvers/notification.resolver");
const notification_model_name_1 = require("./schemas/notification.model-name");
const notification_schema_1 = require("./schemas/notification.schema");
const notification_gateway_1 = require("./services/notification.gateway");
const notification_service_1 = require("./services/notification.service");
let NotificationModule = class NotificationModule {
};
NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { schema: notification_schema_1.notificationSchema, name: notification_model_name_1.notificationModelName },
            ]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            event_emitter_1.EventEmitterModule.forRoot()
        ],
        controllers: [notification_controller_1.NotificationController],
        providers: [
            notification_service_1.NotificationService,
            notification_resolver_1.NotificationResolver,
            notification_gateway_1.NotificationGateway
        ],
        exports: [notification_service_1.NotificationService]
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.module.js.map
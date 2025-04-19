"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const auth_resolver_1 = require("./auth.resolver");
const axios_1 = require("@nestjs/axios");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const keycloak_config_service_1 = require("./keycloack/keycloak-config.service");
const session_property_resolver_1 = require("./session-property.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const token_acknowledgment_schema_1 = require("./schemas/token-acknowledgment.schema");
const token_acknowledgment_model_name_1 = require("./schemas/token-acknowledgment.model-name");
const token_acknowledgment_service_1 = require("./services/token-acknowledgment.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const email_module_1 = require("../email/email.module");
const user_module_1 = require("../users/user.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_keycloak_connect_1.KeycloakConnectModule.registerAsync({
                useClass: keycloak_config_service_1.KeycloakConfigService,
            }),
            mongoose_1.MongooseModule.forFeature([
                { schema: token_acknowledgment_schema_1.tokenAcknowledgmentSchema, name: token_acknowledgment_model_name_1.tokenAcknowledgmentModelName },
            ]),
            axios_1.HttpModule,
            event_emitter_1.EventEmitterModule.forRoot(),
            email_module_1.EmailModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule)
        ],
        providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver, session_property_resolver_1.SessionPropertyResolver, token_acknowledgment_service_1.TokenAcknowledgmentService],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, nest_keycloak_connect_1.KeycloakConnectModule]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
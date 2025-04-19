"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const service_property_resolver_1 = require("./resolvers/service-property.resolver");
const service_resolver_1 = require("./resolvers/service.resolver");
const service_model_name_1 = require("./schemas/service.model-name");
const service_schema_1 = require("./schemas/service.schema");
const service_service_1 = require("./services/service.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const auth_module_1 = require("../auth/auth.module");
const service_public_resolver_1 = require("./resolvers/service-public.resolver");
const user_module_1 = require("../users/user.module");
let ServiceModule = class ServiceModule {
};
ServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { schema: service_schema_1.serviceSchema, name: service_model_name_1.serviceModelName },
            ]),
            event_emitter_1.EventEmitterModule.forRoot(),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        providers: [
            service_service_1.ServiceService,
            service_resolver_1.ServiceResolver,
            service_property_resolver_1.ServicePropertyResolver,
            service_public_resolver_1.ServicePublicResolver,
        ],
        exports: [service_service_1.ServiceService],
    })
], ServiceModule);
exports.ServiceModule = ServiceModule;
//# sourceMappingURL=service.module.js.map
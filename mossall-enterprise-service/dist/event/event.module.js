"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const event_resolver_1 = require("./resolvers/event.resolver");
const event_model_name_1 = require("./schemas/event.model-name");
const event_schema_1 = require("./schemas/event.schema");
const event_service_1 = require("./services/event.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../users/user.module");
const event_property_resolver_1 = require("./resolvers/event-property.resolver");
const organisation_service_module_1 = require("../organisation-service/organisation-service.module");
const service_module_1 = require("../service/service.module");
const category_sociopro_service_module_1 = require("../category-sociopro-service/category-sociopro-service.module");
let EventModule = class EventModule {
};
EventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ schema: event_schema_1.eventSchema, name: event_model_name_1.eventModelName }]),
            event_emitter_1.EventEmitterModule.forRoot(),
            (0, common_1.forwardRef)(() => organisation_service_module_1.OrganisationServiceModule),
            (0, common_1.forwardRef)(() => service_module_1.ServiceModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => category_sociopro_service_module_1.CategorySocioproServiceModule),
        ],
        providers: [event_service_1.EventService, event_resolver_1.EventResolver, event_property_resolver_1.EventPropertyResolver],
        exports: [event_service_1.EventService],
    })
], EventModule);
exports.EventModule = EventModule;
//# sourceMappingURL=event.module.js.map
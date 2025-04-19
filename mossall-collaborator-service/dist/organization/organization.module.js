"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const organization_service_1 = require("./services/organization.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const email_module_1 = require("../email/email.module");
const user_module_1 = require("../users/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const organization_schema_1 = require("./schemas/organization.schema");
const organization_model_name_1 = require("./schemas/organization.model-name");
let OrganizationModule = class OrganizationModule {
};
OrganizationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { schema: organization_schema_1.organizationSchema, name: organization_model_name_1.organizationModelName },
            ]),
            auth_module_1.AuthModule,
            event_emitter_1.EventEmitterModule.forRoot(),
            email_module_1.EmailModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        providers: [
            organization_service_1.OrganizationService,
        ],
        exports: [organization_service_1.OrganizationService]
    })
], OrganizationModule);
exports.OrganizationModule = OrganizationModule;
//# sourceMappingURL=organization.module.js.map
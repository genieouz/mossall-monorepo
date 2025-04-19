"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const demande_module_1 = require("../demande/demande.module");
const organization_module_1 = require("../organization/organization.module");
const payment_module_1 = require("../payment/payment.module");
const user_module_1 = require("../users/user.module");
const activity_property_resolver_1 = require("./resolvers/activity-property.resolver");
const activity_resolver_1 = require("./resolvers/activity.resolver");
const activity_model_name_1 = require("./schemas/activity.model-name");
const activity_schema_1 = require("./schemas/activity.schema");
const activity_service_1 = require("./services/activity.service");
let ActivityModule = class ActivityModule {
};
ActivityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { schema: activity_schema_1.activitieschema, name: activity_model_name_1.activityModelName },
            ]),
            organization_module_1.OrganizationModule,
            payment_module_1.PaymentModule,
            demande_module_1.DemandeModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule
        ],
        providers: [
            activity_service_1.Activitieservice,
            activity_resolver_1.ActivityResolver,
            activity_property_resolver_1.ActivityPropertyResolver
        ],
    })
], ActivityModule);
exports.ActivityModule = ActivityModule;
//# sourceMappingURL=activity.module.js.map
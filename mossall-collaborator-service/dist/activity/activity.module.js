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
const demande_module_1 = require("../demande/demande.module");
const organization_module_1 = require("../organization/organization.module");
const payment_module_1 = require("../payment/payment.module");
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
            demande_module_1.DemandeModule
        ],
        providers: [
            activity_service_1.Activitieservice,
            activity_resolver_1.ActivityResolver,
        ],
    })
], ActivityModule);
exports.ActivityModule = ActivityModule;
//# sourceMappingURL=activity.module.js.map
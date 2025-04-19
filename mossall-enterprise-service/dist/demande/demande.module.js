"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const notification_module_1 = require("../notification/notification.module");
const organization_module_1 = require("../organization/organization.module");
const payment_module_1 = require("../payment/payment.module");
const user_module_1 = require("../users/user.module");
const demande_property_resolver_1 = require("./resolvers/demande-property.resolver");
const demande_resolver_1 = require("./resolvers/demande.resolver");
const demande_model_name_1 = require("./schemas/demande.model-name");
const demande_schema_1 = require("./schemas/demande.schema");
const demande_events_service_1 = require("./services/demande-events.service");
const demande_service_1 = require("./services/demande.service");
const demande_controller_1 = require("./controllers/demande/demande.controller");
const demande_file_service_1 = require("./services/demande-file.service");
const organisation_service_module_1 = require("../organisation-service/organisation-service.module");
const remboursement_module_1 = require("../remboursement/remboursement.module");
const service_module_1 = require("../service/service.module");
let DemandeModule = class DemandeModule {
};
DemandeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: demande_model_name_1.demandeModelName,
                    useFactory: async (connection) => {
                        const schema = demande_schema_1.demandeSchema;
                        const AutoIncrement = require('mongoose-sequence')(connection);
                        schema.plugin(AutoIncrement, { inc_field: 'number' });
                        return schema;
                    },
                    inject: [(0, mongoose_1.getConnectionToken)()],
                },
            ]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => notification_module_1.NotificationModule),
            (0, common_1.forwardRef)(() => payment_module_1.PaymentModule),
            (0, common_1.forwardRef)(() => organization_module_1.OrganizationModule),
            (0, common_1.forwardRef)(() => organisation_service_module_1.OrganisationServiceModule),
            (0, common_1.forwardRef)(() => remboursement_module_1.RemboursementModule),
            (0, common_1.forwardRef)(() => service_module_1.ServiceModule),
        ],
        providers: [
            demande_service_1.DemandeService,
            demande_events_service_1.DemandeEventsService,
            demande_resolver_1.DemandeResolver,
            demande_property_resolver_1.DemandePropertyResolver,
            demande_file_service_1.DemandeFileService,
        ],
        exports: [demande_service_1.DemandeService],
        controllers: [demande_controller_1.DemandeController],
    })
], DemandeModule);
exports.DemandeModule = DemandeModule;
//# sourceMappingURL=demande.module.js.map
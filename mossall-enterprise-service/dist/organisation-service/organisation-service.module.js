"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganisationServiceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const organisation_service_resolver_1 = require("./resolvers/organisation-service.resolver");
const organisation_service_model_name_1 = require("./schemas/organisation-service.model-name");
const organisation_service_schema_1 = require("./schemas/organisation-service.schema");
const organisation_service_service_1 = require("./services/organisation-service.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../users/user.module");
const organisation_service_property_resolver_1 = require("./resolvers/organisation-service-property.resolver");
const organization_module_1 = require("../organization/organization.module");
const event_module_1 = require("../event/event.module");
const service_module_1 = require("../service/service.module");
const category_sociopro_module_1 = require("../category-sociopro/category-sociopro.module");
const demande_module_1 = require("../demande/demande.module");
const category_sociopro_service_module_1 = require("../category-sociopro-service/category-sociopro-service.module");
let OrganisationServiceModule = class OrganisationServiceModule {
};
OrganisationServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { schema: organisation_service_schema_1.organisationServiceSchema, name: organisation_service_model_name_1.organisationServiceModelName },
            ]),
            event_emitter_1.EventEmitterModule.forRoot(),
            (0, common_1.forwardRef)(() => organization_module_1.OrganizationModule),
            (0, common_1.forwardRef)(() => event_module_1.EventModule),
            (0, common_1.forwardRef)(() => service_module_1.ServiceModule),
            (0, common_1.forwardRef)(() => category_sociopro_module_1.CategorySocioproModule),
            (0, common_1.forwardRef)(() => category_sociopro_service_module_1.CategorySocioproServiceModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => demande_module_1.DemandeModule),
        ],
        providers: [
            organisation_service_service_1.OrganisationServiceService,
            organisation_service_resolver_1.OrganisationServiceResolver,
            organisation_service_property_resolver_1.OrganizationServicePropertyResolver,
        ],
        exports: [organisation_service_service_1.OrganisationServiceService],
    })
], OrganisationServiceModule);
exports.OrganisationServiceModule = OrganisationServiceModule;
//# sourceMappingURL=organisation-service.module.js.map
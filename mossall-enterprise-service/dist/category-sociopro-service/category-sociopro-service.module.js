"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySocioproServiceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_sociopro_service_property_resolver_1 = require("./resolvers/category-sociopro-service-property.resolver");
const category_sociopro_service_resolver_1 = require("./resolvers/category-sociopro-service.resolver");
const category_sociopro_service_model_name_1 = require("./schemas/category-sociopro-service.model-name");
const category_sociopro_service_schema_1 = require("./schemas/category-sociopro-service.schema");
const category_sociopro_service_service_1 = require("./services/category-sociopro-service.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../users/user.module");
const category_sociopro_module_1 = require("../category-sociopro/category-sociopro.module");
const organisation_service_module_1 = require("../organisation-service/organisation-service.module");
const event_module_1 = require("../event/event.module");
let CategorySocioproServiceModule = class CategorySocioproServiceModule {
};
CategorySocioproServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    schema: category_sociopro_service_schema_1.categorySocioproServiceSchema,
                    name: category_sociopro_service_model_name_1.categorySocioproServiceModelName,
                },
            ]),
            event_emitter_1.EventEmitterModule.forRoot(),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => category_sociopro_module_1.CategorySocioproModule),
            (0, common_1.forwardRef)(() => organisation_service_module_1.OrganisationServiceModule),
            (0, common_1.forwardRef)(() => event_module_1.EventModule),
        ],
        providers: [
            category_sociopro_service_service_1.CategorySocioproServiceService,
            category_sociopro_service_resolver_1.CategorySocioproServiceResolver,
            category_sociopro_service_property_resolver_1.CategorySocioproServicePropertyResolver,
        ],
        exports: [category_sociopro_service_service_1.CategorySocioproServiceService],
    })
], CategorySocioproServiceModule);
exports.CategorySocioproServiceModule = CategorySocioproServiceModule;
//# sourceMappingURL=category-sociopro-service.module.js.map
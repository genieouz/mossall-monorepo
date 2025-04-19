"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySocioproModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_sociopro_property_resolver_1 = require("./resolvers/category-sociopro-property.resolver");
const category_sociopro_resolver_1 = require("./resolvers/category-sociopro.resolver");
const category_sociopro_model_name_1 = require("./schemas/category-sociopro.model-name");
const category_sociopro_schema_1 = require("./schemas/category-sociopro.schema");
const category_sociopro_service_1 = require("./services/category-sociopro.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../users/user.module");
const organization_module_1 = require("../organization/organization.module");
const category_sociopro_service_module_1 = require("../category-sociopro-service/category-sociopro-service.module");
let CategorySocioproModule = class CategorySocioproModule {
};
CategorySocioproModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { schema: category_sociopro_schema_1.categorySocioproSchema, name: category_sociopro_model_name_1.categorySocioproModelName },
            ]),
            event_emitter_1.EventEmitterModule.forRoot(),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => organization_module_1.OrganizationModule),
            (0, common_1.forwardRef)(() => category_sociopro_service_module_1.CategorySocioproServiceModule),
        ],
        providers: [
            category_sociopro_service_1.CategorySocioproService,
            category_sociopro_resolver_1.CategorySocioproResolver,
            category_sociopro_property_resolver_1.CategorySocioproPropertyResolver,
        ],
        exports: [category_sociopro_service_1.CategorySocioproService],
    })
], CategorySocioproModule);
exports.CategorySocioproModule = CategorySocioproModule;
//# sourceMappingURL=category-sociopro.module.js.map
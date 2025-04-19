"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const axios_1 = require("@nestjs/axios");
const user_property_resolver_1 = require("./resolvers/user-property.resolver");
const organization_module_1 = require("../organization/organization.module");
const user_resolver_1 = require("./resolvers/user.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const user_model_name_1 = require("./schemas/user.model-name");
const demande_module_1 = require("../demande/demande.module");
const users_controller_1 = require("./controllers/users/users.controller");
const file_upload_service_1 = require("./file.upload.service");
const category_sociopro_module_1 = require("../category-sociopro/category-sociopro.module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ schema: user_schema_1.userSchema, name: user_model_name_1.userModelName }]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            axios_1.HttpModule,
            (0, common_1.forwardRef)(() => organization_module_1.OrganizationModule),
            (0, common_1.forwardRef)(() => demande_module_1.DemandeModule),
            category_sociopro_module_1.CategorySocioproModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            user_service_1.UserService,
            file_upload_service_1.FileUploadService,
            user_property_resolver_1.UserPropertyResolver,
            user_resolver_1.UserResolver,
        ],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map
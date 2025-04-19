"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemboursementModule = void 0;
const common_1 = require("@nestjs/common");
const remboursement_service_1 = require("./services/remboursement.service");
const mongoose_1 = require("@nestjs/mongoose");
const remboursement_model_name_1 = require("./schemas/remboursement.model-name");
const remboursement_schema_1 = require("./schemas/remboursement.schema");
const remboursement_resolver_1 = require("./resolvers/remboursement.resolver");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../users/user.module");
const demande_module_1 = require("../demande/demande.module");
const remboursement_property_resolver_1 = require("./resolvers/remboursement-property.resolver");
let RemboursementModule = class RemboursementModule {
};
RemboursementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { schema: remboursement_schema_1.remboursementSchema, name: remboursement_model_name_1.remboursementModelName },
            ]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => demande_module_1.DemandeModule),
        ],
        providers: [
            remboursement_service_1.RemboursementService,
            remboursement_resolver_1.RemboursementResolver,
            remboursement_property_resolver_1.RemboursementPropertyResolver,
        ],
        exports: [remboursement_service_1.RemboursementService],
    })
], RemboursementModule);
exports.RemboursementModule = RemboursementModule;
//# sourceMappingURL=remboursement.module.js.map
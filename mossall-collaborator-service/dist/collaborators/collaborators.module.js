"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorsModule = void 0;
const collaborators_service_1 = require("./collaborators.service");
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../users/user.module");
const axios_1 = require("@nestjs/axios");
const collaborators_resolver_1 = require("./collaborators.resolver");
const demande_module_1 = require("../demande/demande.module");
let CollaboratorsModule = class CollaboratorsModule {
};
CollaboratorsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            user_module_1.UserModule,
            axios_1.HttpModule,
            demande_module_1.DemandeModule
        ],
        controllers: [],
        providers: [collaborators_service_1.CollaboratorsService, collaborators_resolver_1.CollaboratorsResolver],
        exports: [collaborators_service_1.CollaboratorsService]
    })
], CollaboratorsModule);
exports.CollaboratorsModule = CollaboratorsModule;
//# sourceMappingURL=collaborators.module.js.map
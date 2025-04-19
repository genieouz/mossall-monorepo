"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const user_module_1 = require("./users/user.module");
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const env_1 = require("./config/env");
const auth_module_1 = require("./auth/auth.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const organization_module_1 = require("./organization/organization.module");
const collaborators_module_1 = require("./collaborators/collaborators.module");
const demande_module_1 = require("./demande/demande.module");
const activity_module_1 = require("./activity/activity.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            mongoose_1.MongooseModule.forRoot(env_1.MONGODB_URL),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloFederationDriver,
                autoSchemaFile: { path: 'schema.gql', federation: 2 },
                introspection: true,
                playground: true
            }),
            auth_module_1.AuthModule,
            event_emitter_1.EventEmitterModule.forRoot(),
            organization_module_1.OrganizationModule,
            collaborators_module_1.CollaboratorsModule,
            demande_module_1.DemandeModule,
            activity_module_1.ActivityModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
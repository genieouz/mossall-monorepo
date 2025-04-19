"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppModule_1;
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
const notification_module_1 = require("./notification/notification.module");
const demande_module_1 = require("./demande/demande.module");
const payment_module_1 = require("./payment/payment.module");
const core_1 = require("@nestjs/core");
const app_interceptor_1 = require("./app.interceptor");
const config_1 = require("@nestjs/config");
const activity_module_1 = require("./activity/activity.module");
const any_scalar_1 = require("./commons/graphql/scalars/any.scalar");
const organisation_service_module_1 = require("./organisation-service/organisation-service.module");
const category_sociopro_module_1 = require("./category-sociopro/category-sociopro.module");
const event_module_1 = require("./event/event.module");
const service_module_1 = require("./service/service.module");
const category_sociopro_service_module_1 = require("./category-sociopro-service/category-sociopro-service.module");
const remboursement_module_1 = require("./remboursement/remboursement.module");
let AppModule = AppModule_1 = class AppModule {
    constructor(configService) {
        this.configService = configService;
        AppModule_1.port = +this.configService.get('API_PORT');
        AppModule_1.apiVersion = this.configService.get('API_VERSION');
        AppModule_1.apiPrefix = this.configService.get('API_PREFIX');
    }
};
AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            mongoose_1.MongooseModule.forRoot(env_1.MONGODB_URL),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloFederationDriver,
                autoSchemaFile: { path: 'schema.gql', federation: 2 },
                introspection: true,
                playground: true,
            }),
            auth_module_1.AuthModule,
            event_emitter_1.EventEmitterModule.forRoot(),
            organization_module_1.OrganizationModule,
            collaborators_module_1.CollaboratorsModule,
            notification_module_1.NotificationModule,
            demande_module_1.DemandeModule,
            payment_module_1.PaymentModule,
            organisation_service_module_1.OrganisationServiceModule,
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
            remboursement_module_1.RemboursementModule,
            activity_module_1.ActivityModule,
            category_sociopro_module_1.CategorySocioproModule,
            category_sociopro_service_module_1.CategorySocioproServiceModule,
            event_module_1.EventModule,
            service_module_1.ServiceModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: app_interceptor_1.AppInterceptor,
            },
            any_scalar_1.Any,
        ],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const demande_module_1 = require("../demande/demande.module");
const user_module_1 = require("../users/user.module");
const payment_controller_1 = require("./controllers/payment.controller");
const payment_resolver_1 = require("./resolvers/payment.resolver");
const payment_model_name_1 = require("./schemas/payment.model-name");
const payment_schema_1 = require("./schemas/payment.schema");
const payment_service_1 = require("./services/payment.service");
let PaymentModule = class PaymentModule {
};
PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { schema: payment_schema_1.paymentSchema, name: payment_model_name_1.paymentModelName },
            ]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => demande_module_1.DemandeModule),
            axios_1.HttpModule,
        ],
        controllers: [payment_controller_1.PaymentController],
        providers: [
            payment_service_1.PaymentService,
            payment_resolver_1.PaymentResolver,
        ],
        exports: [payment_service_1.PaymentService]
    })
], PaymentModule);
exports.PaymentModule = PaymentModule;
//# sourceMappingURL=payment.module.js.map
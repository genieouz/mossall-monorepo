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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const abstract_service_1 = require("../../commons/abstract/abstract.service");
const env_1 = require("../../config/env");
const user_service_1 = require("../../users/user.service");
const payment_model_name_1 = require("../schemas/payment.model-name");
let PaymentService = class PaymentService extends abstract_service_1.AbstractService {
    constructor(model, userService, httpService, eventEmitter) {
        super(model);
        this.userService = userService;
        this.httpService = httpService;
        this.eventEmitter = eventEmitter;
    }
    async validateDemande(demande, validatedBy) {
        const collab = await this.userService.findByIdOrFail(demande.owner);
        if (!collab.phoneNumber) {
            throw new common_1.BadRequestException("Le collaborateur ne dispose pas d'un numéro de téléphone valide!");
        }
        const headers = {
            headers: {
                Authorization: `Bearer ${env_1.ALAL_API_KEY}`,
            },
        };
        try {
            const body = {
                amount: demande.amount,
                network: 'wave-sn',
                customer: {
                    email: collab.email,
                    full_name: `${collab.firstName} ${collab.lastName}`,
                    phone: collab.phoneNumber,
                },
            };
            const result = (await (0, rxjs_1.lastValueFrom)(this.httpService.post(`${env_1.ALAL_API_URL}/disburses/create`, body, headers)));
            await this.insertOne(Object.assign(Object.assign({}, result.data.data.disburse), { meta: { demandeId: demande.id, validatedBy } }));
            return true;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async newPayment(payment) {
        await this.insertOne(payment);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('new_payment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentService.prototype, "newPayment", null);
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_model_name_1.paymentModelName)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        axios_1.HttpService,
        event_emitter_1.EventEmitter2])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map
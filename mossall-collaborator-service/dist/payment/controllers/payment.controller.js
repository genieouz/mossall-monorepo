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
var PaymentController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../services/payment.service");
const crypto = require("crypto");
const env_1 = require("../../config/env");
const demande_service_1 = require("../../demande/services/demande.service");
const demande_status_enum_1 = require("../../demande/enums/demande-status.enum");
const event_emitter_1 = require("@nestjs/event-emitter");
let PaymentController = PaymentController_1 = class PaymentController {
    constructor(paymentService, demandeService, eventEmitter) {
        this.paymentService = paymentService;
        this.demandeService = demandeService;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(`🖇️ ${PaymentController_1.name}🖇️`);
    }
    async updateDisburse(body, req) {
        var _a, _b;
        this.logger.log("===> IN WEBHOOK");
        const hash = crypto.createHmac('sha512', env_1.ALAL_API_KEY).update(JSON.stringify(body)).digest('hex');
        this.logger.log("===> IN WEBHOOK HASH");
        this.logger.log(hash);
        if (hash == req.headers['x-alal-signature']) {
            this.logger.log("===> IN WEBHOOK HASH VALID");
            const disburse = body.data;
            const demandeId = (_a = disburse.meta) === null || _a === void 0 ? void 0 : _a.demandeId;
            this.logger.log("Search for transaction");
            const found = await this.paymentService.findOne({ reference: disburse.reference, $and: [{ 'meta.demandeId': { $ne: null } }, { 'meta.demandeId': demandeId }] });
            this.logger.log({ foundTransaction: found });
            if (!found) {
                throw new common_1.ForbiddenException(`Transaction non reconnue!`);
            }
            else {
                const updateTransactionResult = await this.paymentService.updateOne({ reference: disburse.reference }, { $set: disburse });
                this.logger.log({ updateTransactionResult });
                const date = new Date();
                const demande = await this.demandeService.findOneAndUpdate({ _id: demandeId }, { status: demande_status_enum_1.DemandeStatus.VALIDATED,
                    validatedAt: date,
                    validatedAtMonth: date.getMonth(),
                    validatedAtYear: date.getFullYear(),
                    validatedBy: (_b = found === null || found === void 0 ? void 0 : found.meta) === null || _b === void 0 ? void 0 : _b.validatedBy,
                    pendingValidation: false });
                this.logger.log({ demandeUpdateResult: demande });
                this.eventEmitter.emit('demande.status.changed', demande);
            }
        }
        else {
            this.logger.log("===> IN WEBHOOK HASH NOT VALID");
        }
    }
};
__decorate([
    (0, common_1.Post)('disburses/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updateDisburse", null);
PaymentController = PaymentController_1 = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        demande_service_1.DemandeService,
        event_emitter_1.EventEmitter2])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map
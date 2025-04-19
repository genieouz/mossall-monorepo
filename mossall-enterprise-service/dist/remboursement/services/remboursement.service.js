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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RemboursementService_logger;
var RemboursementService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemboursementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const remboursement_model_name_1 = require("../schemas/remboursement.model-name");
const mongoose_2 = require("mongoose");
const abstract_service_1 = require("../../commons/abstract/abstract.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const remboursement_status_enum_1 = require("../enums/remboursement-status.enum");
const user_service_1 = require("../../users/user.service");
const demande_service_1 = require("../../demande/services/demande.service");
let RemboursementService = RemboursementService_1 = class RemboursementService extends abstract_service_1.AbstractService {
    constructor(model, userService, demandeService, eventEmitter) {
        super(model);
        this.userService = userService;
        this.demandeService = demandeService;
        this.eventEmitter = eventEmitter;
        _RemboursementService_logger.set(this, new common_1.Logger(`🎰${RemboursementService_1.name}🎰`));
    }
    async handleDemandeCreatedEvent({ demande, collab, }) {
        __classPrivateFieldGet(this, _RemboursementService_logger, "f").log('Start handling demande created event');
        const remboursements = [];
        for (let i = 0; i < demande.refundDuration; i++) {
            const remboursement = {
                amount: demande.amount / demande.refundDuration,
                number: i + 1,
                demandeId: demande._id,
                userId: collab._id,
            };
            remboursements.push(remboursement);
        }
        await this.insertMany(remboursements);
        __classPrivateFieldGet(this, _RemboursementService_logger, "f").log('End handling demande created event');
    }
    async validate(remboursementId, admin) {
        const remboursement = await this.findOneOrFail({ _id: remboursementId });
        const demande = await this.demandeService.findOneOrFail({
            _id: remboursement.demandeId,
        });
        await this.userService.findOneOrFail({
            _id: demande.owner,
            blocked: { $ne: true },
        });
        if (String(admin.organization) != String(demande.organization) ||
            !['ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN_ORG', 'DRH', 'RH'].includes(admin.role)) {
            throw new common_1.ForbiddenException('Vous ne pouvez pas effectuer cette action.');
        }
        if (remboursement.status == remboursement_status_enum_1.RemboursementStatus.PAYED) {
            throw new common_1.BadRequestException(`Votre demande a déjà été validé!`);
        }
        const date = new Date();
        await this.updateOneById(remboursement.id, {
            validatedBy: admin.id || admin._id,
            status: remboursement_status_enum_1.RemboursementStatus.PAYED,
            validatedAt: date,
            validatedAtMonth: date.getMonth(),
            validatedAtYear: date.getFullYear(),
        });
        this.eventEmitter.emit('demande.remboursement.done', demande);
        return true;
    }
};
_RemboursementService_logger = new WeakMap();
__decorate([
    (0, event_emitter_1.OnEvent)('demande.validate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RemboursementService.prototype, "handleDemandeCreatedEvent", null);
RemboursementService = RemboursementService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(remboursement_model_name_1.remboursementModelName)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        demande_service_1.DemandeService,
        event_emitter_1.EventEmitter2])
], RemboursementService);
exports.RemboursementService = RemboursementService;
//# sourceMappingURL=remboursement.service.js.map
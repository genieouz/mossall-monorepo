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
var _DemandeService_logger;
var DemandeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_service_1 = require("../../commons/abstract/abstract.service");
const demande_model_name_1 = require("../schemas/demande.model-name");
const user_service_1 = require("../../users/user.service");
const demande_status_enum_1 = require("../enums/demande-status.enum");
const notification_service_1 = require("../../notification/services/notification.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const time_1 = require("../../commons/time");
const payment_service_1 = require("../../payment/services/payment.service");
const organization_service_1 = require("../../organization/services/organization.service");
const alal_payment_status_enum_1 = require("../enums/alal-payment-status.enum");
const bson_1 = require("bson");
const demande_utils_1 = require("../demande.utils");
const service_service_1 = require("../../service/services/service.service");
let DemandeService = DemandeService_1 = class DemandeService extends abstract_service_1.AbstractService {
    constructor(model, userService, notificationService, eventEmitter, paymentService, organizationService, produitService) {
        super(model, [
            'status',
            'organization',
            'amount|number',
            'number|number',
            'users.owner._id:firstName+lastName',
        ]);
        this.userService = userService;
        this.notificationService = notificationService;
        this.eventEmitter = eventEmitter;
        this.paymentService = paymentService;
        this.organizationService = organizationService;
        this.produitService = produitService;
        _DemandeService_logger.set(this, new common_1.Logger(DemandeService_1.name));
    }
    async cancel(demandeId, currentUser) {
        const demande = await this.findOneOrFail({
            _id: demandeId,
            owner: currentUser._id,
        });
        if (demande.status !== demande_status_enum_1.DemandeStatus.PENDING) {
            throw new common_1.BadRequestException(`Votre demande ne peux plus être annulé!`);
        }
        const result = await this.updateOneById(demandeId, {
            status: demande_status_enum_1.DemandeStatus.CANCELLED,
        });
        const user = await this.userService.getUserById(currentUser._id);
        this.eventEmitter.emit('notification.create', {
            entityId: demande.id,
            author: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: currentUser.email,
                id: currentUser._id,
                organization: user.organization,
            },
            content: `${user.firstName} ${user.lastName} a annulé la demande N°${demande.number}.`,
            organization: user.organization,
            title: `Demande N°${demande.number}`,
        });
        return result;
    }
    async validate(demandeId, admin, autovalidate = false) {
        const demande = await this.findOneOrFail({ _id: demandeId });
        const collab = await this.userService.findOneOrFail({
            _id: demande.owner,
            blocked: { $ne: true },
        });
        if (!autovalidate)
            if (String(admin.organization) != String(demande.organization) ||
                !['ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN_ORG', 'DRH', 'RH'].includes(admin.role)) {
                throw new common_1.ForbiddenException('Vous ne pouvez pas effectuer cette action.');
            }
        if (demande.status == demande_status_enum_1.DemandeStatus.CANCELLED) {
            throw new common_1.BadRequestException(`Votre demande ne peux plus être validé!`);
        }
        const date = new Date();
        await this.updateOneById(demande.id, {
            validatedByBeforeWebhook: admin.id || admin._id,
            validatedBy: admin.id || admin._id,
            pendingPayment: true,
            status: demande_status_enum_1.DemandeStatus.VALIDATED,
            validatedAt: date,
            validatedAtMonth: date.getMonth(),
            validatedAtYear: date.getFullYear(),
            remainingRefundAmount: demande.amount,
        });
        this.eventEmitter.emit('demande.status.changed', demande);
        this.eventEmitter.emit('demande.validate', {
            demande,
            collab,
        });
        const validatedBy = admin.id || admin._id;
        const result = await this.paymentService.validateDemande(demande, validatedBy);
        if (!result) {
            throw new common_1.BadRequestException('La transaction a échoué. Veuillez vérifier le numéro de téléphone du collaborateur.');
        }
        return this.updateOneById(demandeId, {
            transactionReference: result.reference,
        });
    }
    async paye(demandeId, admin) {
        __classPrivateFieldGet(this, _DemandeService_logger, "f").log('===> IN PAYE');
        const demande = await this.findOneOrFail({ _id: demandeId });
        __classPrivateFieldGet(this, _DemandeService_logger, "f").log('===> research demande by id is ok');
        const payement = await this.paymentService.findOne({
            'meta.demandeId': String(demandeId),
        });
        if (!payement || payement.status != alal_payment_status_enum_1.AlalPaymentStatus.success) {
            __classPrivateFieldGet(this, _DemandeService_logger, "f").log("===> 'Cette transaction ne peux pas être remboursée car avait échoué'");
            throw new common_1.BadRequestException('Cette transaction ne peux pas être remboursée car avait échoué');
        }
        if (String(admin.organization) != String(demande.organization) ||
            !['ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN_ORG', 'DRH', 'RH'].includes(admin.role)) {
            __classPrivateFieldGet(this, _DemandeService_logger, "f").log("===> 'Vous ne pouvez pas effectuer cette action.'");
            throw new common_1.ForbiddenException('Vous ne pouvez pas effectuer cette action.');
        }
        if (demande.status != demande_status_enum_1.DemandeStatus.VALIDATED) {
            __classPrivateFieldGet(this, _DemandeService_logger, "f").log("===> 'Votre demande n'est pas validé!'");
            throw new common_1.BadRequestException(`Votre demande n'est pas validé!`);
        }
        const date = new Date();
        __classPrivateFieldGet(this, _DemandeService_logger, "f").log('===> update demande status');
        const result = await this.updateOneById(demandeId, {
            status: demande_status_enum_1.DemandeStatus.PAYED,
            validatedAt: date,
            validatedAtMonth: date.getMonth(),
            validatedAtYear: date.getFullYear(),
        });
        __classPrivateFieldGet(this, _DemandeService_logger, "f").log('===> emit event');
        this.eventEmitter.emit('demande.status.changed', demande);
        this.eventEmitter.emit('activity.demande.paye', {
            initialValue: demande,
            user: admin,
        });
        return result;
    }
    async cancelByAdmin(demandeId, admin) {
        const demande = await this.findOneOrFail({ _id: demandeId });
        if (String(admin.organization) != String(demande.organization) ||
            !['ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN_ORG', 'DRH', 'RH'].includes(admin.role)) {
            throw new common_1.ForbiddenException('Vous ne pouvez pas effectuer cette action.');
        }
        console.log('ICI');
        if (demande.status !== demande_status_enum_1.DemandeStatus.PENDING) {
            throw new common_1.BadRequestException(`Votre demande ne peux plus être annulé!`);
        }
        const result = await this.updateOneById(demandeId, {
            status: demande_status_enum_1.DemandeStatus.CANCELLED,
            cancelledAt: new Date(),
        });
        this.eventEmitter.emit('demande.status.changed', demande);
        this.eventEmitter.emit('activity.demande.cancel-by-admin', {
            initialValue: demande,
            user: admin,
        });
        return result;
    }
    async rejectByAdmin(demandeId, admin, rejectedReason) {
        const demande = await this.findOneOrFail({ _id: demandeId });
        if (String(admin.organization) != String(demande.organization) ||
            !['ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN_ORG', 'DRH', 'RH'].includes(admin.role)) {
            throw new common_1.ForbiddenException('Vous ne pouvez pas effectuer cette action.');
        }
        if (demande.status !== demande_status_enum_1.DemandeStatus.PENDING) {
            throw new common_1.BadRequestException(`Votre demande ne peux plus être rejetée!`);
        }
        const result = await this.updateOneById(demandeId, {
            status: demande_status_enum_1.DemandeStatus.REJECTED,
            rejectedAt: new Date(),
            rejectedReason,
            rejectedBy: admin.id || admin._id,
        });
        this.eventEmitter.emit('demande.status.changed', demande);
        this.eventEmitter.emit('activity.demande.reject', {
            initialValue: demande,
            user: admin,
        });
        return result;
    }
    async checkAmount(newDemandeAmount, user, forUpdate = 0) {
        const balance = await this.getBalance(user);
        if (newDemandeAmount > balance + forUpdate) {
            return false;
        }
        return true;
    }
    async checkAmountOrFail(newDemandeAmount, user, forUpdate = 0) {
        const possible = await this.checkAmount(newDemandeAmount, user, forUpdate);
        if (!possible) {
            throw new common_1.BadRequestException('Le montant demandé est supérieur à votre balance!');
        }
    }
    async maxAmountAuthorized(user) {
        const organization = await this.organizationService.findOneByIdOrFail(user.organization);
        const percent = (user.salary * organization.amountPercent) / 100;
        return percent <= organization.maxDemandeAmount
            ? percent
            : organization.maxDemandeAmount;
    }
    async getBalance(user) {
        const totalDemande = await this.getTotalDemandeAmount(user);
        const maxAuthorized = await this.maxAmountAuthorized(user);
        return maxAuthorized - totalDemande;
    }
    async getTotalDemandeAmount(user) {
        const demandes = await this.aggregateTotal([
            {
                $match: { owner: user._id, status: { $in: ['VALIDATED', 'PENDING'] } },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' },
                },
            },
        ]);
        return demandes;
    }
    async getDemandesMetrics(organization, metricsInput) {
        let endDate = new Date(metricsInput.endDate);
        endDate.setDate(endDate.getDate() + 1);
        const total = await this.aggregateMany([
            {
                $match: {
                    status: { $in: [demande_status_enum_1.DemandeStatus.VALIDATED, demande_status_enum_1.DemandeStatus.PAYED] },
                    organization: new bson_1.ObjectId(organization),
                    createdAt: { $gte: new Date(metricsInput.startDate), $lte: endDate },
                },
            },
            {
                $group: {
                    _id: { month: '$validatedAtMonth', year: '$validatedAtYear' },
                    date: { $first: '$validatedAt' },
                    total: { $sum: '$amount' },
                },
            },
            {
                $sort: {
                    date: 1,
                },
            },
            {
                $project: {
                    _id: false,
                    month: '$_id.month',
                    year: '$_id.year',
                    amount: '$total',
                },
            },
        ]);
        const payed = await this.aggregateMany([
            {
                $match: {
                    status: demande_status_enum_1.DemandeStatus.PAYED,
                    organization: new bson_1.ObjectId(organization),
                    createdAt: {
                        $gte: new Date(metricsInput.startDate),
                        $lte: new Date(metricsInput.endDate),
                    },
                },
            },
            {
                $group: {
                    _id: { month: '$validatedAtMonth', year: '$validatedAtYear' },
                    date: { $first: '$validatedAt' },
                    total: { $sum: '$amount' },
                },
            },
            {
                $sort: {
                    date: 1,
                },
            },
            {
                $project: {
                    _id: false,
                    month: '$_id.month',
                    year: '$_id.year',
                    amount: '$total',
                },
            },
        ]);
        const remaining = total.map((t) => {
            let payedMonth = payed.find((p) => p.month == t.month && p.year == t.year);
            t.date = `${(0, time_1.getMonthNameFromIndex)(t.month || 0)} ${t.year}`;
            return {
                month: t.month,
                year: t.year,
                amount: t.amount - ((payedMonth === null || payedMonth === void 0 ? void 0 : payedMonth.amount) || 0),
                date: `${(0, time_1.getMonthNameFromIndex)(t.month || 0)} ${t.year}`,
            };
        });
        return { total, remaining, payed };
    }
    async getSupportPaiement(organization) {
        const { demandeDeadlineDay } = organization;
        const startDate = new Date();
        startDate.setDate(demandeDeadlineDay);
        startDate.setMonth(startDate.getMonth() - 1);
        const endDate = new Date();
        endDate.setDate(demandeDeadlineDay);
        return this.aggregateMany([
            {
                $match: {
                    status: demande_status_enum_1.DemandeStatus.VALIDATED,
                    createdAt: { $gte: startDate, $lt: endDate },
                    organization: { $in: [organization._id, organization.id] },
                },
            },
            {
                $project: {
                    _id: false,
                    owner: '$owner',
                    organizationServiceId: '$organizationServiceId',
                    amount: { $add: ['$amount', { $multiply: ['$amount', demande_utils_1.WaveFees] }] },
                },
            },
            {
                $group: {
                    _id: {
                        owner: '$owner',
                        organizationServiceId: '$organizationServiceId',
                    },
                    amount: { $sum: '$amount' },
                },
            },
            {
                $project: {
                    _id: false,
                    owner: '$_id.owner',
                    organizationServiceId: '$_id.organizationServiceId',
                    amount: '$amount',
                },
            },
            {
                $sort: {
                    owner: 1,
                },
            },
        ]);
    }
    async findByCollaborator(collaboratorId, status) {
        if (status) {
            return this.findMany({ owner: new bson_1.ObjectId(collaboratorId), status });
        }
        return this.findMany({ owner: new bson_1.ObjectId(collaboratorId) });
    }
};
_DemandeService_logger = new WeakMap();
DemandeService = DemandeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(demande_model_name_1.demandeModelName)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        notification_service_1.NotificationService,
        event_emitter_1.EventEmitter2,
        payment_service_1.PaymentService,
        organization_service_1.OrganizationService,
        service_service_1.ServiceService])
], DemandeService);
exports.DemandeService = DemandeService;
//# sourceMappingURL=demande.service.js.map
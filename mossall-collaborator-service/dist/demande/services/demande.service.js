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
const time_1 = require("../../commons/time");
const notification_service_1 = require("../../notification/services/notification.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const organization_service_1 = require("../../organization/services/organization.service");
const demande_action_enum_1 = require("../enums/demande-action.enum");
const demande_constant_1 = require("../demande.constant");
let DemandeService = DemandeService_1 = class DemandeService extends abstract_service_1.AbstractService {
    constructor(model, userService, notificationService, eventEmitter, organizationService) {
        super(model);
        this.userService = userService;
        this.notificationService = notificationService;
        this.eventEmitter = eventEmitter;
        this.organizationService = organizationService;
        _DemandeService_logger.set(this, new common_1.Logger(`🎰${DemandeService_1.name}🎰`));
    }
    async create(demandeInput, currentUser) {
        __classPrivateFieldGet(this, _DemandeService_logger, "f").log('create demande with payload ' + JSON.stringify(demandeInput));
        __classPrivateFieldGet(this, _DemandeService_logger, "f").warn('beginning the validation of request');
        if (!currentUser.bankAccountNumber) {
            __classPrivateFieldGet(this, _DemandeService_logger, "f").warn('user not have bank account number');
            throw new common_1.PreconditionFailedException("Vous n'avez pas encore renseigné votre numéro de compte bancaire.");
        }
        if (!currentUser.phoneNumber) {
            __classPrivateFieldGet(this, _DemandeService_logger, "f").warn('user not have phone number');
            throw new common_1.PreconditionFailedException("Vous n'avez pas encore renseigné votre numéro de téléphone.");
        }
        if (!currentUser.salary) {
            __classPrivateFieldGet(this, _DemandeService_logger, "f").warn('user not have salary');
            throw new common_1.PreconditionFailedException("Vous n'avez pas encore renseigné votre salaire.");
        }
        const today = new Date();
        const { demandeDeadlineDay } = await this.organizationService.findOneById(currentUser.organization);
        if (today.getDate() > demandeDeadlineDay) {
            __classPrivateFieldGet(this, _DemandeService_logger, "f").warn('today is deadline day');
            throw new common_1.PreconditionFailedException(`La deadline de la demande est : ${today.getFullYear()} / ${today.getMonth()} / ${demandeDeadlineDay}`);
        }
        const OnePending = await this.findOne({
            owner: currentUser._id,
            status: { $in: [demande_status_enum_1.DemandeStatus.PENDING, demande_status_enum_1.DemandeStatus.IN_PROCESS] },
        });
        if (OnePending) {
            throw new common_1.BadRequestException('il y a déjà une demande en cours de validation!');
        }
        await this.checkAmountOrFail(demandeInput.amount, currentUser);
        const result = await this.insertOne(Object.assign(Object.assign({}, demandeInput), { organization: currentUser.organization, owner: currentUser._id, fees: demandeInput.amount * demande_constant_1.WaveFees }));
        this.eventEmitter.emit('notification.create', {
            entityId: result.id,
            author: {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                id: currentUser._id,
                organization: currentUser.organization,
            },
            content: `${currentUser.firstName} ${currentUser.lastName} a ajouté une nouvelle demande de ${result.amount} XOF.`,
            organization: currentUser.organization,
            title: `Demande N°${result.number}`,
        });
        this.eventEmitter.emit('demande.status.changed', {
            demande: result,
            action: demande_action_enum_1.DemandeAction.create,
        });
        this.eventEmitter.emit('activity.demande.create', {
            initialValue: result,
            user: currentUser,
        });
        return result;
    }
    async update(demandeId, demandeInput, currentUser) {
        const demande = await this.findOneOrFail({
            _id: demandeId,
            owner: currentUser._id,
        });
        if (demande.status !== demande_status_enum_1.DemandeStatus.PENDING) {
            throw new common_1.BadRequestException(`Votre demande ne peux plus faire l'objet de modification!`);
        }
        const user = (await this.userService.findById(currentUser._id));
        await this.checkAmountOrFail(demandeInput.amount, user, demande.amount);
        const result = await this.updateOneById(demandeId, Object.assign(Object.assign({}, demandeInput), { fees: demandeInput.amount * demande_constant_1.WaveFees }));
        this.eventEmitter.emit('demande.status.changed', {
            demande,
            action: demande_action_enum_1.DemandeAction.update,
        });
        this.eventEmitter.emit('activity.demande.update', {
            initialValue: demande,
            user: currentUser,
        });
        return result;
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
        this.eventEmitter.emit('notification.create', {
            entityId: demande.id,
            author: {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                id: currentUser._id,
                organization: currentUser.organization,
            },
            content: `${currentUser.firstName} ${currentUser.lastName} a annulé la demande N°${demande.number}.`,
            organization: currentUser.organization,
            title: `Demande N°${demande.number}`,
        });
        this.eventEmitter.emit('demande.status.changed', {
            demande,
            action: demande_action_enum_1.DemandeAction.cancel,
        });
        this.eventEmitter.emit('activity.demande.cancel-by-collaborator', {
            initialValue: demande,
            user: currentUser,
        });
        return result;
    }
    async validate(demandeId, admin) {
        const demande = await this.findOneOrFail({ _id: demandeId });
        if (admin.organization != demande.organization ||
            !['ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN_ORG', 'DRH', 'RH'].includes(admin.role)) {
            throw new common_1.ForbiddenException('Vous ne pouvez pas effectuer cette action.');
        }
        if (demande.status == demande_status_enum_1.DemandeStatus.CANCELLED) {
            throw new common_1.BadRequestException(`Votre demande ne peux plus être validé!`);
        }
        const date = new Date();
        return this.updateOneById(demandeId, {
            status: demande_status_enum_1.DemandeStatus.VALIDATED,
            validatedAt: date,
            validatedAtMonth: date.getMonth(),
            validatedAtYear: date.getFullYear(),
        });
    }
    async paye(demandeId, admin) {
        const demande = await this.findOneOrFail({ _id: demandeId });
        if (admin.organization != demande.organization ||
            !['ADMIN', 'SUPER_ADMIN', 'SUPER_ADMIN_ORG', 'DRH', 'RH'].includes(admin.role)) {
            throw new common_1.ForbiddenException('Vous ne pouvez pas effectuer cette action.');
        }
        if (demande.status != demande_status_enum_1.DemandeStatus.VALIDATED) {
            throw new common_1.BadRequestException(`Votre demande n'est pas validé!`);
        }
        const date = new Date();
        return this.updateOneById(demandeId, {
            status: demande_status_enum_1.DemandeStatus.PAYED,
            validatedAt: date,
            validatedAtMonth: date.getMonth(),
            validatedAtYear: date.getFullYear(),
        });
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
        const demandes = await this.findMany({
            owner: user._id,
            status: { $in: ['VALIDATED', 'PENDING'] },
        });
        return demandes.map((d) => d.amount).reduce((a, b) => a + b, 0);
    }
    async getMyDemandesMetrics(metricsFilter, owner) {
        let endDate = new Date(metricsFilter.endDate);
        endDate.setDate(endDate.getDate() + 1);
        const results = await this.aggregateMany([
            {
                $match: {
                    status: { $in: [demande_status_enum_1.DemandeStatus.VALIDATED, demande_status_enum_1.DemandeStatus.PAYED] },
                    owner,
                    createdAt: { $gte: new Date(metricsFilter.startDate), $lte: endDate },
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
                    month: { $add: ['$_id.month', 1] },
                    year: '$_id.year',
                    value: '$total',
                },
            },
        ]);
        return results;
    }
    async getDemandesMetrics(admin, metricsInput) {
        let endDate = new Date(metricsInput.endDate);
        endDate.setDate(endDate.getDate() + 1);
        const total = await this.aggregateMany([
            {
                $match: {
                    status: { $in: [demande_status_enum_1.DemandeStatus.VALIDATED, demande_status_enum_1.DemandeStatus.PAYED] },
                    organization: admin.organization,
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
                    organization: admin.organization,
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
};
_DemandeService_logger = new WeakMap();
DemandeService = DemandeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(demande_model_name_1.demandeModelName)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        notification_service_1.NotificationService,
        event_emitter_1.EventEmitter2,
        organization_service_1.OrganizationService])
], DemandeService);
exports.DemandeService = DemandeService;
//# sourceMappingURL=demande.service.js.map
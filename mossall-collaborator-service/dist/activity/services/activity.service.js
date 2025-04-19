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
var Activitieservice_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activitieservice = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_service_1 = require("../../commons/abstract/abstract.service");
const activity_model_name_1 = require("../schemas/activity.model-name");
const event_emitter_1 = require("@nestjs/event-emitter");
const time_1 = require("../../commons/time");
const activity_scope_enum_1 = require("../enums/activity-scope.enum");
const organization_service_1 = require("../../organization/services/organization.service");
const payment_service_1 = require("../../payment/services/payment.service");
const demande_service_1 = require("../../demande/services/demande.service");
let Activitieservice = Activitieservice_1 = class Activitieservice extends abstract_service_1.AbstractService {
    constructor(model, organizationService, paymentService, demandeService) {
        super(model);
        this.organizationService = organizationService;
        this.paymentService = paymentService;
        this.demandeService = demandeService;
        this.logger = new common_1.Logger(`🖇️ ${Activitieservice_1.name}🖇️`);
    }
    async CreateDemande(payload) {
        var _a, _b;
        const { user, initialValue } = payload;
        const activity = await this.createDemandeActivity(user, initialValue);
        const message = `${user.firstName} ${user.lastName}(${user.email}) a créé une nouvelle demande d'un montant de ${(_a = activity.initialValue) === null || _a === void 0 ? void 0 : _a.amount}. 
    Demande N°: ${(_b = activity.initialValue) === null || _b === void 0 ? void 0 : _b.number}, 
    ${activity.message}`;
        const org = await this.organizationService.findOneById(user.organization);
        this.logger.log(`Organization ${org.name}: ${message}`);
        await this.insertOne(Object.assign(Object.assign({}, activity), { message, scope: activity_scope_enum_1.ActivityScope.demande }));
    }
    async UpdateDemande(payload) {
        var _a;
        const { user, initialValue } = payload;
        const activity = await this.createDemandeActivity(user, initialValue);
        const message = `${user.firstName} ${user.lastName}(${user.email}) a modifié sa demande N°${(_a = activity.initialValue) === null || _a === void 0 ? void 0 : _a.number}. 
    ${activity.message}`;
        const org = await this.organizationService.findOneById(user.organization);
        this.logger.log(`Organization ${org.name}: ${message}`);
        await this.insertOne(Object.assign(Object.assign({}, activity), { message, scope: activity_scope_enum_1.ActivityScope.demande }));
    }
    async CancelByCollaboratorDemande(payload) {
        var _a;
        const { user, initialValue } = payload;
        const activity = await this.createDemandeActivity(user, initialValue);
        const message = `${user.firstName} ${user.lastName}(${user.email}) a annulé sa demande N°${(_a = activity.initialValue) === null || _a === void 0 ? void 0 : _a.number}. 
    ${activity.message}`;
        const org = await this.organizationService.findOneById(user.organization);
        this.logger.log(`Organization ${org.name}: ${message}`);
        await this.insertOne(Object.assign(Object.assign({}, activity), { message, scope: activity_scope_enum_1.ActivityScope.demande }));
    }
    async CancelByAdminDemande(payload) {
        var _a;
        const { user, initialValue } = payload;
        const activity = await this.createDemandeActivity(user, initialValue);
        const message = `${user.firstName} ${user.lastName}(${user.email}) a annulé la demande N°${(_a = activity.initialValue) === null || _a === void 0 ? void 0 : _a.number}. 
    ${activity.message}`;
        const org = await this.organizationService.findOneById(user.organization);
        this.logger.log(`Organization ${org.name}: ${message}`);
        await this.insertOne(Object.assign(Object.assign({}, activity), { message, scope: activity_scope_enum_1.ActivityScope.demande }));
    }
    async RejectDemande(payload) {
        var _a, _b;
        const { user, initialValue } = payload;
        const activity = await this.createDemandeActivity(user, initialValue);
        const message = `${user.firstName} ${user.lastName}(${user.email}) a rejeté la demande N°${(_a = activity.initialValue) === null || _a === void 0 ? void 0 : _a.number}. 
    ${activity.message}, 
    Motif rejet: ${(_b = activity.currentValue) === null || _b === void 0 ? void 0 : _b.rejectedReason}, `;
        const org = await this.organizationService.findOneById(user.organization);
        this.logger.log(`Organization ${org.name}: ${message}`);
        await this.insertOne(Object.assign(Object.assign({}, activity), { message, scope: activity_scope_enum_1.ActivityScope.demande }));
    }
    async ValidateDemande(payload) {
        var _a, _b, _c;
        const { user, initialValue } = payload;
        const activity = await this.createDemandeActivity(user, initialValue);
        const payment = await this.paymentService.findOne({ 'meta.demandeId': ((_a = activity.initialValue) === null || _a === void 0 ? void 0 : _a.id) || ((_b = activity.initialValue) === null || _b === void 0 ? void 0 : _b._id) });
        const message = `${user.firstName} ${user.lastName}(${user.email}) a validé la demande N°${(_c = activity.initialValue) === null || _c === void 0 ? void 0 : _c.number}. 
    ${activity.message}, 
    Statut payment: ${payment === null || payment === void 0 ? void 0 : payment.status}, `;
        const org = await this.organizationService.findOneById(user.organization);
        this.logger.log(`Organization ${org.name}: ${message}`);
        await this.insertOne(Object.assign(Object.assign({}, activity), { message, scope: activity_scope_enum_1.ActivityScope.demande }));
    }
    async PayeDemande(payload) {
        var _a;
        const { user, initialValue } = payload;
        const activity = await this.createDemandeActivity(user, initialValue);
        const message = `${user.firstName} ${user.lastName}(${user.email}) a marqué "Remboursé" la demande N°${(_a = activity.initialValue) === null || _a === void 0 ? void 0 : _a.number}. 
    ${activity.message}`;
        const org = await this.organizationService.findOneById(user.organization);
        this.logger.log(`Organization ${org.name}: ${message}`);
        await this.insertOne(Object.assign(Object.assign({}, activity), { message, scope: activity_scope_enum_1.ActivityScope.demande }));
    }
    async createDemandeActivity(user, initialValue) {
        var _a, _b;
        const date = new Date();
        const formattedDate = time_1.DateFormatter.format(date, 'yyyy-MM-dd HH:mm:ss');
        const currentValue = await this.demandeService.findOneById(initialValue.id || initialValue._id);
        const activity = {
            organization: user.organization,
            user: user.id || user._id,
            initialValue: ((_a = initialValue.toObject) === null || _a === void 0 ? void 0 : _a.call(initialValue)) || initialValue,
            currentValue: ((_b = currentValue.toObject) === null || _b === void 0 ? void 0 : _b.call(currentValue)) || currentValue,
            message: `Statut initial: ${initialValue === null || initialValue === void 0 ? void 0 : initialValue.status}, 
      Statut actuel: ${currentValue === null || currentValue === void 0 ? void 0 : currentValue.status}, 
      Montant: ${currentValue === null || currentValue === void 0 ? void 0 : currentValue.amount}, 
      Date: ${formattedDate}`,
            meta: {},
            scope: activity_scope_enum_1.ActivityScope.demande
        };
        return activity;
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('activity.demande.create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Activitieservice.prototype, "CreateDemande", null);
__decorate([
    (0, event_emitter_1.OnEvent)('activity.demande.update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Activitieservice.prototype, "UpdateDemande", null);
__decorate([
    (0, event_emitter_1.OnEvent)('activity.demande.cancel-by-collaborator'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Activitieservice.prototype, "CancelByCollaboratorDemande", null);
__decorate([
    (0, event_emitter_1.OnEvent)('activity.demande.cancel-by-admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Activitieservice.prototype, "CancelByAdminDemande", null);
__decorate([
    (0, event_emitter_1.OnEvent)('activity.demande.reject'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Activitieservice.prototype, "RejectDemande", null);
__decorate([
    (0, event_emitter_1.OnEvent)('activity.demande.validate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Activitieservice.prototype, "ValidateDemande", null);
__decorate([
    (0, event_emitter_1.OnEvent)('activity.demande.paye'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Activitieservice.prototype, "PayeDemande", null);
Activitieservice = Activitieservice_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(activity_model_name_1.activityModelName)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        organization_service_1.OrganizationService,
        payment_service_1.PaymentService,
        demande_service_1.DemandeService])
], Activitieservice);
exports.Activitieservice = Activitieservice;
//# sourceMappingURL=activity.service.js.map
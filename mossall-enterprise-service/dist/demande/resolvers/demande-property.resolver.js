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
exports.DemandePropertyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../users/dto/user.entity");
const user_service_1 = require("../../users/user.service");
const demande_entity_1 = require("../dto/demande.entity");
const payment_service_1 = require("../../payment/services/payment.service");
const demande_status_enum_1 = require("../enums/demande-status.enum");
const alal_payment_status_enum_1 = require("../enums/alal-payment-status.enum");
const organisation_service_entity_1 = require("../../organisation-service/dto/organisation-service.entity");
const organisation_service_service_1 = require("../../organisation-service/services/organisation-service.service");
const bson_1 = require("bson");
const remboursement_service_1 = require("../../remboursement/services/remboursement.service");
const remboursement_entity_1 = require("../../remboursement/dto/remboursement.entity");
let DemandePropertyResolver = class DemandePropertyResolver {
    constructor(userService, paymentService, organisationServiceService, remboursementService) {
        this.userService = userService;
        this.paymentService = paymentService;
        this.organisationServiceService = organisationServiceService;
        this.remboursementService = remboursementService;
    }
    async collaborator(demande) {
        return this.userService.findOne({ _id: new bson_1.ObjectId(demande.owner) });
    }
    async statusText(demande) {
        if (demande.status != demande_status_enum_1.DemandeStatus.VALIDATED) {
            return demande.status;
        }
        const payment = await this.paymentService.findOne({
            'meta.demandeId': String(demande.id),
        });
        if (!payment) {
            return 'Paie Echouée';
        }
        if (payment.status == 'success') {
            return 'VALIDATED';
        }
        else if (payment.status === alal_payment_status_enum_1.AlalPaymentStatus.pending ||
            payment.status === alal_payment_status_enum_1.AlalPaymentStatus.processing) {
            return 'Paie en cours';
        }
        else if (payment.status === alal_payment_status_enum_1.AlalPaymentStatus.failed) {
            return 'Paie Echouée';
        }
        else {
            return payment.status;
        }
    }
    async organisationService(demande) {
        return this.organisationServiceService.findOneById(demande.organizationServiceId);
    }
    async remboursements(demande) {
        return this.remboursementService.findMany({ demandeId: demande._id });
    }
};
__decorate([
    (0, graphql_1.ResolveField)((returns) => user_entity_1.User),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandePropertyResolver.prototype, "collaborator", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => String, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandePropertyResolver.prototype, "statusText", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => organisation_service_entity_1.OrganisationService, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandePropertyResolver.prototype, "organisationService", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => [remboursement_entity_1.Remboursement], { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandePropertyResolver.prototype, "remboursements", null);
DemandePropertyResolver = __decorate([
    (0, graphql_1.Resolver)((of) => demande_entity_1.Demande),
    __metadata("design:paramtypes", [user_service_1.UserService,
        payment_service_1.PaymentService,
        organisation_service_service_1.OrganisationServiceService,
        remboursement_service_1.RemboursementService])
], DemandePropertyResolver);
exports.DemandePropertyResolver = DemandePropertyResolver;
//# sourceMappingURL=demande-property.resolver.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendinblueService = void 0;
const common_1 = require("@nestjs/common");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const event_emitter_1 = require("@nestjs/event-emitter");
const env_1 = require("../../config/env");
const demande_utils_1 = require("../../demande/demande.utils");
let SendinblueService = class SendinblueService {
    constructor() {
        this.client = SibApiV3Sdk.ApiClient.instance;
        this.apiKey = this.client.authentications['api-key'];
        this.apiKey.apiKey = env_1.SENDINBLUE_API_KEY;
    }
    async sendInvitationToOrganizationAdmin({ email, password, frontUrl, }) {
        return this.sendEmail({ email, password, frontUrl: frontUrl || env_1.ADMIN_FRONT_URL }, [{ email }], 39);
    }
    async inviteCollaborator({ email, password }) {
        return this.sendEmail({ email, password }, [{ email }], 38);
    }
    async notifyCollaboratorForDemandeStatusChanged({ email, demande, }) {
        const demandeNumber = demande.number;
        const demandeStatus = demande.status;
        const demandeStatusText = demande_utils_1.DemandeStatusText[demande.status];
        const demandeRejectedReason = demande.rejectedReason;
        const demandeAmount = demande.amount;
        return this.sendEmail({
            email,
            demandeNumber,
            demandeStatus,
            demandeStatusText,
            demandeRejectedReason,
            demandeAmount,
        }, [{ email }], 42);
    }
    async sendForgotPasswordCode({ email, password }) {
        return this.sendEmail({ email, password }, [{ email }], 40);
    }
    async sendEmail(params, to, templateId) {
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = {
            to,
            templateId,
            params,
        };
        try {
            const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log({ data });
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('organization.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SendinblueService.prototype, "sendInvitationToOrganizationAdmin", null);
__decorate([
    (0, event_emitter_1.OnEvent)('collaborator.invite'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SendinblueService.prototype, "inviteCollaborator", null);
__decorate([
    (0, event_emitter_1.OnEvent)('email.demande.status.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SendinblueService.prototype, "notifyCollaboratorForDemandeStatusChanged", null);
__decorate([
    (0, event_emitter_1.OnEvent)('startforgotpassword'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SendinblueService.prototype, "sendForgotPasswordCode", null);
SendinblueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SendinblueService);
exports.SendinblueService = SendinblueService;
//# sourceMappingURL=sendinblue.service.js.map
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
const demande_action_enum_1 = require("../../demande/enums/demande-action.enum");
let SendinblueService = class SendinblueService {
    constructor() {
        this.client = SibApiV3Sdk.ApiClient.instance;
        this.apiKey = this.client.authentications['api-key'];
        this.apiKey.apiKey = env_1.SENDINBLUE_API_KEY;
    }
    async sendInvitationToOrganizationAdmin({ email, password, frontUrl, }) {
        return this.sendEmail({ email, password, frontUrl }, [{ email }], 1);
    }
    async inviteCollaborator({ email, password }) {
        return this.sendEmail({ email, password }, [{ email }], 2);
    }
    async notifyCollaboratorForDemandeStatusChanged({ emails, demande, action, collaboratorName, }) {
        const demandeNumber = demande.number;
        const demandeStatus = demande.status;
        let demandeStatusText = demande.status;
        if (action === demande_action_enum_1.DemandeAction.create) {
            demandeStatusText = 'créé';
        }
        else if (action === demande_action_enum_1.DemandeAction.update) {
            demandeStatusText = 'modifié';
        }
        else if (action === demande_action_enum_1.DemandeAction.cancel) {
            demandeStatusText = 'annulé';
        }
        const demandeAmount = demande.amount;
        return this.sendEmail({
            demandeNumber,
            demandeStatus,
            demandeStatusText,
            demandeAmount,
            collaboratorName,
            frontUrl: env_1.ADMIN_FRONT_URL,
        }, emails, 6, {
            subject: `Demande ${demandeStatusText}e`,
        });
    }
    async sendForgotPasswordCode({ email, password }) {
        console.log({ email, password });
        return this.sendEmail({ email, password }, [{ email }], 3);
    }
    async sendResetPasswordSuccess({ email }) {
        return this.sendEmail({ email }, [{ email }], 4);
    }
    async sendEmail(params, to, templateId, additionalSibParams = {}) {
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = Object.assign(Object.assign({}, additionalSibParams), { to,
            templateId,
            params });
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
__decorate([
    (0, event_emitter_1.OnEvent)('finalizeforgotpassword'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SendinblueService.prototype, "sendResetPasswordSuccess", null);
SendinblueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SendinblueService);
exports.SendinblueService = SendinblueService;
//# sourceMappingURL=sendinblue.service.js.map
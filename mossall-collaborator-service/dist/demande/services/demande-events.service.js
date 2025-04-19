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
exports.DemandeEventsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
const user_service_1 = require("../../users/user.service");
const demande_service_1 = require("./demande.service");
let DemandeEventsService = class DemandeEventsService {
    constructor(userService, demandeService, eventEmitter) {
        this.userService = userService;
        this.demandeService = demandeService;
        this.eventEmitter = eventEmitter;
    }
    async demandeStatusChanged({ demande, action, }) {
        const user = await this.userService.findById(demande.owner);
        const totalDemandeAmount = await this.demandeService.getTotalDemandeAmount(user);
        const balance = await this.demandeService.getBalance(user);
        await this.userService.updateOne({ id: user._id }, { balance, totalDemandeAmount });
        const newDemande = await this.demandeService.findOneById(demande.id);
        const adminRoles = [
            user_role_enum_1.UserRole.ADMIN,
            user_role_enum_1.UserRole.SUPER_ADMIN,
            user_role_enum_1.UserRole.SUPER_ADMIN_ORG,
        ];
        const admins = await this.userService.findMany({
            organization: user.organization,
            enableEmailNotification: true,
            role: { $in: adminRoles },
        });
        const emails = admins.map((a) => ({ email: a.email }));
        this.eventEmitter.emit('email.demande.status.changed', {
            demande: newDemande,
            emails,
            action,
            collaboratorName: `${user.firstName} ${user.lastName}`,
        });
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('demande.status.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandeEventsService.prototype, "demandeStatusChanged", null);
DemandeEventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        demande_service_1.DemandeService,
        event_emitter_1.EventEmitter2])
], DemandeEventsService);
exports.DemandeEventsService = DemandeEventsService;
//# sourceMappingURL=demande-events.service.js.map
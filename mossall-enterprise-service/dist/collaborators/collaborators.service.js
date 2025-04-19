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
exports.CollaboratorsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const utils_1 = require("../commons/utils");
const user_service_1 = require("../users/user.service");
const bson_1 = require("bson");
const auth_service_1 = require("../auth/auth.service");
let CollaboratorsService = class CollaboratorsService {
    constructor(eventEmitter, userSerive, authService) {
        this.eventEmitter = eventEmitter;
        this.userSerive = userSerive;
        this.authService = authService;
    }
    async inviteCollaborator(payload, categorySocioProId, currentUserId) {
        const password = (0, utils_1.generatePassword)(12, {
            numbers: true,
            uppercase: true,
            symbols: true,
        });
        const currentUser = await this.userSerive.findOneById(currentUserId);
        const found = await this.userSerive.findOne({
            $or: [
                { email: payload.email },
                { uniqueIdentifier: payload.uniqueIdentifier },
                { phoneNumber: payload.phoneNumber },
                { bankAccountNumber: payload.bankAccountNumber },
            ],
        });
        if (found) {
            throw new common_1.ConflictException('Email ou Téléphone ou Identifiant ou compte bancaire déjà utilisé');
        }
        const tmpUser = await this.userSerive.insertOne(Object.assign(Object.assign({}, payload), { id: new bson_1.ObjectId(), organization: currentUser.organization, role: 'COLLABORATOR', password: this.authService.hashPassword(password), categorySocioPro: categorySocioProId }));
        this.eventEmitter.emit('collaborator.invite', {
            email: payload.email,
            password,
        });
        return true;
    }
    async inviteAdmin(payload, currentUserId) {
        const password = (0, utils_1.generatePassword)(12, {
            numbers: true,
            uppercase: true,
            symbols: true,
        });
        const hashedPassword = this.authService.hashPassword(password);
        const currentUser = await this.userSerive.getUserById(currentUserId);
        const found = await this.userSerive.findOne({
            $or: [
                { email: payload.email },
                { uniqueIdentifier: payload.uniqueIdentifier },
                { phoneNumber: payload.phoneNumber },
                { bankAccountNumber: payload.bankAccountNumber },
            ],
        });
        if (found) {
            throw new common_1.ConflictException('Email ou Téléphone ou Identifiant ou compte bancaire déjà utilisé');
        }
        const tmpUser = await this.userSerive.insertOne(Object.assign(Object.assign({}, payload), { id: new bson_1.ObjectId(), organization: currentUser.organization, role: 'ADMIN', password: hashedPassword }));
        this.eventEmitter.emit('organization.created', {
            email: payload.email,
            password,
        });
        return true;
    }
    async updateCollaborator(payload, collaboratorId, categorySocioProId) {
        return this.userSerive.updateOneById(collaboratorId, Object.assign(Object.assign({}, payload), { categorySocioPro: categorySocioProId }));
    }
};
CollaboratorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        user_service_1.UserService,
        auth_service_1.AuthService])
], CollaboratorsService);
exports.CollaboratorsService = CollaboratorsService;
//# sourceMappingURL=collaborators.service.js.map
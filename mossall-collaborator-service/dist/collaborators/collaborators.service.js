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
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const env_1 = require("../config/env");
const user_service_1 = require("../users/user.service");
let CollaboratorsService = class CollaboratorsService {
    constructor(eventEmitter, userSerive, httpService) {
        this.eventEmitter = eventEmitter;
        this.userSerive = userSerive;
        this.httpService = httpService;
    }
    async updateBankAccountNumber(bankAccountNumber, collaboratorId) {
        const result = await this.httpService.put(`${env_1.USER_SERVICE_URL}/users/collaborator/${collaboratorId}/bank/number`, { bankAccountNumber }).toPromise();
        return result.data;
    }
};
CollaboratorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        user_service_1.UserService,
        axios_1.HttpService])
], CollaboratorsService);
exports.CollaboratorsService = CollaboratorsService;
//# sourceMappingURL=collaborators.service.js.map
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
exports.UserService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_service_1 = require("../commons/abstract/abstract.service");
const user_model_name_1 = require("./schemas/user.model-name");
let UserService = class UserService extends abstract_service_1.AbstractService {
    constructor(model, httpService) {
        super(model);
        this.httpService = httpService;
    }
    findById(_id) {
        return this.findOne({ _id });
    }
    async createAdmin(payload, password) { }
    async createCollaborator(payload, password) { }
    async createUser(payload) { }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_name_1.userModelName)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        axios_1.HttpService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
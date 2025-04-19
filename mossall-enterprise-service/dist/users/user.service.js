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
const rxjs_1 = require("rxjs");
const abstract_service_1 = require("../commons/abstract/abstract.service");
const bcrypt = require("bcrypt");
const env_1 = require("../config/env");
const user_model_name_1 = require("./schemas/user.model-name");
const user_role_enum_1 = require("./enums/user-role.enum");
const utils_1 = require("../commons/utils");
let UserService = class UserService extends abstract_service_1.AbstractService {
    constructor(model, httpService) {
        super(model, ['firstName', 'lastName', 'email', 'uniqueIdentifier']);
        this.httpService = httpService;
        this.url = env_1.USER_SERVICE_URL;
    }
    findById(id) {
        return this.findOne({ _id: id });
    }
    async checkExistingFieldValue(organization, fieldName, fieldValue, isAdmin, entityId) {
        if (!fieldValue) {
            return false;
        }
        const filter = {
            [fieldName]: fieldValue,
        };
        if (entityId) {
            filter._id = { $ne: entityId };
        }
        const found = await this.findOne(filter);
        return Boolean(found);
    }
    findByIdOrFail(_id) {
        return this.findOneOrFail({ _id });
    }
    async updateMyAdminPassword(user, password, newPassword) {
        user.password = bcrypt.hashSync(newPassword, 10);
        return this.updateOne({ _id: user._id }, user);
    }
    async resetPassword(userId, newPassword) {
        const resetEndpoint = `${env_1.KEYCLOAK_URL}/admin/realms/${env_1.KEYCLOAK_ENTERPRISE_REALM}/users/${userId}/reset-password`;
        const body = {
            type: 'password',
            value: newPassword,
            temporary: false,
        };
        const accessToken = '';
        const headersRequest = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.put(resetEndpoint, body, { headers: headersRequest }));
            return true;
        }
        catch (error) {
            console.warn(error);
            throw new common_1.InternalServerErrorException('Quelque chose a mal tourné!');
        }
    }
    async updateUser(userId, payload) {
        return this.updateOneById(userId, payload);
    }
    async updateMyProfile(userId, payload) {
        return this.updateOneById(userId, payload);
    }
    async getUserById(_id) {
        return this.findOneOrFail({ _id });
    }
    async fetchMyCollaborators(organization, metricsInput) {
        let endDate = new Date(metricsInput.endDate);
        endDate.setDate(endDate.getDate() + 1);
        return this.findManyAndPaginate({
            role: user_role_enum_1.UserRole.COLLABORATOR,
            organization,
            createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate },
        });
        return this.findMany({
            role: user_role_enum_1.UserRole.COLLABORATOR,
            organization,
            createdAt: { $gte: new Date(metricsInput.startDate), $lt: endDate },
        });
    }
    async fetchMyAdmins(organization) {
        return this.findMany({ organization, role: user_role_enum_1.UserRole.ADMIN });
    }
    async fetchCollaboratorsThatHasPendingDemandes(queryConfig, queryFilter) {
        const { limit, page = 1, orderBy, search, } = (0, utils_1.normalizeQueryDataConfig)(queryConfig);
        const skip = (page - 1) * limit;
        const stages = [
            {
                $match: Object.assign({}, queryFilter),
            },
            {
                $lookup: {
                    from: 'demandes',
                    localField: '_id',
                    foreignField: 'owner',
                    as: 'demandes',
                },
            },
            {
                $match: {
                    'demandes.status': 'PENDING',
                },
            },
            {
                $addFields: {
                    pendingDemandes: {
                        $filter: {
                            input: '$demandes',
                            as: 'demande',
                            cond: { $eq: ['$$demande.status', 'PENDING'] },
                        },
                    },
                },
            },
            {
                $addFields: {
                    pendingDemandesCount: { $size: '$pendingDemandes' },
                },
            },
            {
                $match: {
                    pendingDemandesCount: { $gt: 0 },
                },
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    phoneNumber: 1,
                    uniqueIdentifier: 1,
                    salary: 1,
                    balance: 1,
                    role: 1,
                    organization: 1,
                    pendingDemandesCount: 1,
                    pendingDemandes: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ];
        const totalCount = await this.aggregateTotal([
            ...stages,
            { $count: 'total' },
        ]);
        const results = await this.aggregateMany([
            ...stages,
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            { $set: { id: '$_id' } },
        ]);
        const pageCount = Math.ceil(totalCount / limit);
        const currentPage = page;
        const pageSize = results.length;
        const pagination = {
            totalItems: totalCount,
            pageCount,
            currentPage,
            pageSize,
        };
        return { results, pagination };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_name_1.userModelName)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        axios_1.HttpService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_service_1 = require("../../commons/abstract/abstract.service");
const notification_model_name_1 = require("../schemas/notification.model-name");
const utils_1 = require("../../commons/utils");
let NotificationService = class NotificationService extends abstract_service_1.AbstractService {
    constructor(model, eventEmitter2) {
        super(model);
        this.eventEmitter2 = eventEmitter2;
    }
    async create(notificationInput) {
        const notification = await this.insertOne(notificationInput);
        this.eventEmitter2.emit('notification.emit', notification);
        return notification;
    }
    async findManyNotificationsAndPaginate(user, queryConfig) {
        const { limit, page = 1, orderBy } = (0, utils_1.normalizeQueryDataConfig)(queryConfig);
        const queryFilter = { organization: user.organization };
        const totalItems = await this.aggregateTotal([
            {
                $match: queryFilter,
            },
            {
                $count: 'total',
            },
        ]);
        if (!totalItems) {
            return {
                results: [],
                pagination: {
                    totalItems: 0,
                    pageCount: 0,
                    currentPage: 0,
                    pageSize: 0,
                },
            };
        }
        const skip = (page - 1) * limit;
        const results = await this.aggregateMany([
            {
                $match: queryFilter,
            },
            {
                $set: {
                    viewedByMe: {
                        $cond: [{ $in: [user._id, '$viewedBy'] }, true, false],
                    },
                },
            },
            {
                $sort: { [orderBy.property]: orderBy.direction || -1 },
            },
            { $skip: skip },
            { $limit: limit },
            {
                $set: { id: '$_id' },
            },
        ]);
        const pageCount = Math.ceil(totalItems / limit);
        const currentPage = page;
        const pageSize = results.length;
        const pagination = {
            totalItems,
            pageCount,
            currentPage,
            pageSize,
        };
        return { results, pagination };
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_model_name_1.notificationModelName)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        event_emitter_1.EventEmitter2])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map
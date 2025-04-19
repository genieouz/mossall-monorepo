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
exports.EventResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const query_data_config_input_1 = require("../../commons/graphql/query-data-config.input");
const event_entity_1 = require("../dto/event.entity");
const event_input_1 = require("../dto/event.input");
const event_update_input_1 = require("../dto/event.update.input");
const event_service_1 = require("../services/event.service");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/auth.guard");
const organisation_service_service_1 = require("../../organisation-service/services/organisation-service.service");
const service_service_1 = require("../../service/services/service.service");
const bson_1 = require("bson");
let EventResolver = class EventResolver {
    constructor(eventService, organisationServiceService, serviceService) {
        this.eventService = eventService;
        this.organisationServiceService = organisationServiceService;
        this.serviceService = serviceService;
    }
    async createEvent(eventInput, organizationServiceId) {
        const organisation = await this.organisationServiceService.findOneByIdOrFail(organizationServiceId);
        await this.serviceService.findOneOrFail({
            _id: organisation.serviceId,
        });
        eventInput.organizationServiceId = organizationServiceId;
        return this.eventService.insertOne(eventInput);
    }
    updateEvent(eventInput, eventId) {
        return this.eventService.updateOneById(eventId, eventInput);
    }
    fetchEvents(queryConfig, organizationServiceId) {
        return this.eventService.findManyAndPaginate({
            organizationServiceId: new bson_1.ObjectId(organizationServiceId),
        }, queryConfig);
    }
    fetchAllEvents(queryConfig, organizationServiceId) {
        return this.eventService.findMany({
            organizationServiceId: new bson_1.ObjectId(organizationServiceId),
        }, queryConfig);
    }
    fetchEvent(eventId) {
        let _id = eventId;
        return this.eventService.findOneOrFail({ _id });
    }
    deleteEvent(eventId) {
        let _id = eventId;
        return this.eventService.deleteOne({ _id });
    }
    activateEvent(eventId) {
        let _id = eventId;
        return this.eventService.updateOne({ _id }, { activated: true, activatedAt: new Date() });
    }
    deactivateEvent(eventId) {
        let _id = eventId;
        return this.eventService.updateOne({ _id }, { activated: false });
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => event_entity_1.Event),
    __param(0, (0, graphql_1.Args)({ name: 'eventInput', type: () => event_input_1.EventInput })),
    __param(1, (0, graphql_1.Args)({ name: 'organizationServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "createEvent", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'eventInput', type: () => event_update_input_1.EventUpdateInput })),
    __param(1, (0, graphql_1.Args)({ name: 'eventId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "updateEvent", null);
__decorate([
    (0, graphql_1.Query)((returns) => event_entity_1.PaginatedEventResult),
    __param(0, (0, graphql_1.Args)({
        name: 'queryConfig',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __param(1, (0, graphql_1.Args)({ name: 'organizationServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_data_config_input_1.QueryDataConfigInput, String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "fetchEvents", null);
__decorate([
    (0, graphql_1.Query)((returns) => [event_entity_1.Event]),
    __param(0, (0, graphql_1.Args)({
        name: 'queryConfig',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __param(1, (0, graphql_1.Args)({ name: 'organizationServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_data_config_input_1.QueryDataConfigInput, String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "fetchAllEvents", null);
__decorate([
    (0, graphql_1.Query)((returns) => event_entity_1.Event),
    __param(0, (0, graphql_1.Args)({ name: 'eventId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "fetchEvent", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'eventId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "deleteEvent", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'eventId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "activateEvent", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'eventId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "deactivateEvent", null);
EventResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [event_service_1.EventService,
        organisation_service_service_1.OrganisationServiceService,
        service_service_1.ServiceService])
], EventResolver);
exports.EventResolver = EventResolver;
//# sourceMappingURL=event.resolver.js.map
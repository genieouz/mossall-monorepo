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
exports.OrganisationServiceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const query_data_config_input_1 = require("../../commons/graphql/query-data-config.input");
const organisation_service_entity_1 = require("../dto/organisation-service.entity");
const organisation_service_input_1 = require("../dto/organisation-service.input");
const organisation_service_update_input_1 = require("../dto/organisation-service.update.input");
const organisation_service_service_1 = require("../services/organisation-service.service");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/auth.guard");
const event_service_1 = require("../../event/services/event.service");
const organization_service_1 = require("../../organization/services/organization.service");
const service_service_1 = require("../../service/services/service.service");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
let OrganisationServiceResolver = class OrganisationServiceResolver {
    constructor(organisationServiceService, organisationService, eventService, serviceService) {
        this.organisationServiceService = organisationServiceService;
        this.organisationService = organisationService;
        this.eventService = eventService;
        this.serviceService = serviceService;
    }
    async createOrganisationService(organisationServiceInput, organisationId, serviceId) {
        const organization = await this.organisationService.findOneByIdOrFail(organisationId);
        const service = await this.serviceService.findOneById(serviceId);
        const exists = await this.organisationServiceService.findOne({
            organizationId: organisationId,
            serviceId,
        });
        if (exists)
            throw new common_1.BadRequestException('Organisation service already exists');
        if (organisationServiceInput.refundDuration > service.refundDurationMonth)
            throw new common_1.BadRequestException('Refund duration cannot be greater than service refund duration');
        organisationServiceInput.organizationId = organisationId;
        organisationServiceInput.serviceId = serviceId;
        return this.organisationServiceService.insertOne(organisationServiceInput);
    }
    updateOrganisationService(organisationServiceInput, organisationServiceId) {
        return this.organisationServiceService.updateOneById(organisationServiceId, organisationServiceInput);
    }
    fetchOrganisationServices(queryConfig) {
        return this.organisationServiceService.findManyAndPaginate({}, queryConfig);
    }
    fetchAllOrganisationServices(queryConfig, user) {
        return this.organisationServiceService.findMany({
            organizationId: user.organization,
        }, queryConfig);
    }
    fetchOrganisationService(organisationServiceId) {
        let _id = organisationServiceId;
        return this.organisationServiceService.findOneOrFail({ _id });
    }
    async fetchOrganisationServiceByOrganisationIdAndServiceId(organisationId, serviceId) {
        const result = await this.organisationServiceService.findOne({
            organizationId: organisationId,
            serviceId,
        });
        console.log(result);
        if (!result)
            return null;
        return result;
    }
    deleteOrganisationService(organisationServiceId) {
        let _id = organisationServiceId;
        return this.organisationServiceService.deleteOne({ _id });
    }
    activateOrganisationService(organisationServiceId) {
        let _id = organisationServiceId;
        return this.organisationServiceService.updateOne({ _id }, { activated: true, activatedAt: new Date() });
    }
    deactivateOrganisationService(organisationServiceId) {
        let _id = organisationServiceId;
        return this.organisationServiceService.updateOne({ _id }, { activated: false });
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => organisation_service_entity_1.OrganisationService),
    __param(0, (0, graphql_1.Args)({
        name: 'organisationServiceInput',
        type: () => organisation_service_input_1.OrganisationServiceInput,
    })),
    __param(1, (0, graphql_1.Args)({ name: 'organisationId', type: () => graphql_1.ID })),
    __param(2, (0, graphql_1.Args)({ name: 'serviceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], OrganisationServiceResolver.prototype, "createOrganisationService", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({
        name: 'organisationServiceInput',
        type: () => organisation_service_update_input_1.OrganisationServiceUpdateInput,
    })),
    __param(1, (0, graphql_1.Args)({ name: 'organisationServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrganisationServiceResolver.prototype, "updateOrganisationService", null);
__decorate([
    (0, graphql_1.Query)((returns) => organisation_service_entity_1.PaginatedOrganisationServiceResult),
    __param(0, (0, graphql_1.Args)({
        name: 'queryConfig',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_data_config_input_1.QueryDataConfigInput]),
    __metadata("design:returntype", Promise)
], OrganisationServiceResolver.prototype, "fetchOrganisationServices", null);
__decorate([
    (0, graphql_1.Query)((returns) => [organisation_service_entity_1.OrganisationService]),
    __param(0, (0, graphql_1.Args)({
        name: 'queryConfig',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_data_config_input_1.QueryDataConfigInput, Object]),
    __metadata("design:returntype", Promise)
], OrganisationServiceResolver.prototype, "fetchAllOrganisationServices", null);
__decorate([
    (0, graphql_1.Query)((returns) => organisation_service_entity_1.OrganisationService),
    __param(0, (0, graphql_1.Args)({ name: 'organisationServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganisationServiceResolver.prototype, "fetchOrganisationService", null);
__decorate([
    (0, graphql_1.Query)((returns) => organisation_service_entity_1.OrganisationService, { nullable: true }),
    __param(0, (0, graphql_1.Args)({ name: 'organisationId', type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)({ name: 'serviceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrganisationServiceResolver.prototype, "fetchOrganisationServiceByOrganisationIdAndServiceId", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'organisationServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganisationServiceResolver.prototype, "deleteOrganisationService", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'organisationServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganisationServiceResolver.prototype, "activateOrganisationService", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'organisationServiceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganisationServiceResolver.prototype, "deactivateOrganisationService", null);
OrganisationServiceResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [organisation_service_service_1.OrganisationServiceService,
        organization_service_1.OrganizationService,
        event_service_1.EventService,
        service_service_1.ServiceService])
], OrganisationServiceResolver);
exports.OrganisationServiceResolver = OrganisationServiceResolver;
//# sourceMappingURL=organisation-service.resolver.js.map
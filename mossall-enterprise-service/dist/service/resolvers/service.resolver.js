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
exports.ServiceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const query_data_config_input_1 = require("../../commons/graphql/query-data-config.input");
const service_entity_1 = require("../dto/service.entity");
const service_input_1 = require("../dto/service.input");
const service_update_input_1 = require("../dto/service.update.input");
const service_service_1 = require("../services/service.service");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/auth.guard");
let ServiceResolver = class ServiceResolver {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    createService(serviceInput) {
        return this.serviceService.insertOne(serviceInput);
    }
    updateService(serviceInput, serviceId) {
        return this.serviceService.updateOneById(serviceId, serviceInput);
    }
    fetchServices(queryConfig) {
        return this.serviceService.findManyAndPaginate({}, queryConfig);
    }
    fetchAllServices(queryConfig) {
        return this.serviceService.findMany({}, queryConfig);
    }
    fetchService(serviceId) {
        let _id = serviceId;
        return this.serviceService.findOneOrFail({ _id });
    }
    deleteService(serviceId) {
        let _id = serviceId;
        return this.serviceService.deleteOne({ _id });
    }
    activateService(serviceId) {
        let _id = serviceId;
        return this.serviceService.updateOne({ _id }, { available: true, publishedAt: new Date() });
    }
    deactivateService(serviceId) {
        let _id = serviceId;
        return this.serviceService.updateOne({ _id }, { available: false });
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => service_entity_1.Service),
    __param(0, (0, graphql_1.Args)({ name: 'serviceInput', type: () => service_input_1.ServiceInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "createService", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'serviceInput', type: () => service_update_input_1.ServiceUpdateInput })),
    __param(1, (0, graphql_1.Args)({ name: 'serviceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "updateService", null);
__decorate([
    (0, graphql_1.Query)((returns) => service_entity_1.PaginatedServiceResult),
    __param(0, (0, graphql_1.Args)({
        name: 'queryConfig',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_data_config_input_1.QueryDataConfigInput]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "fetchServices", null);
__decorate([
    (0, graphql_1.Query)((returns) => [service_entity_1.Service]),
    __param(0, (0, graphql_1.Args)({
        name: 'queryConfig',
        type: () => query_data_config_input_1.QueryDataConfigInput,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_data_config_input_1.QueryDataConfigInput]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "fetchAllServices", null);
__decorate([
    (0, graphql_1.Query)((returns) => service_entity_1.Service),
    __param(0, (0, graphql_1.Args)({ name: 'serviceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "fetchService", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'serviceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "deleteService", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'serviceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "activateService", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'serviceId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceResolver.prototype, "deactivateService", null);
ServiceResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceResolver);
exports.ServiceResolver = ServiceResolver;
//# sourceMappingURL=service.resolver.js.map
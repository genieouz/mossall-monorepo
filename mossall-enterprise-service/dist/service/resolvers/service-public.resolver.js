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
exports.ServicePublicResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const service_service_1 = require("../services/service.service");
const service_entity_1 = require("../dto/service.entity");
const query_data_config_input_1 = require("../../commons/graphql/query-data-config.input");
let ServicePublicResolver = class ServicePublicResolver {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    fetchServicesPub(queryConfig) {
        return this.serviceService.findManyAndPaginate({}, queryConfig);
    }
    fetchServicePub(serviceId) {
        let _id = serviceId;
        return this.serviceService.findOneOrFail({ _id });
    }
};
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
], ServicePublicResolver.prototype, "fetchServicesPub", null);
__decorate([
    (0, graphql_1.Query)((returns) => service_entity_1.Service),
    __param(0, (0, graphql_1.Args)({ name: 'serviceId', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicePublicResolver.prototype, "fetchServicePub", null);
ServicePublicResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServicePublicResolver);
exports.ServicePublicResolver = ServicePublicResolver;
//# sourceMappingURL=service-public.resolver.js.map
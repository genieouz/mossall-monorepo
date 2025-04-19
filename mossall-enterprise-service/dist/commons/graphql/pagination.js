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
exports.PaginatedResult = exports.PaginationInfo = void 0;
const graphql_1 = require("@nestjs/graphql");
let PaginationInfo = class PaginationInfo {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], PaginationInfo.prototype, "totalItems", void 0);
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], PaginationInfo.prototype, "pageCount", void 0);
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], PaginationInfo.prototype, "currentPage", void 0);
__decorate([
    (0, graphql_1.Field)(type => graphql_1.Int),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], PaginationInfo.prototype, "pageSize", void 0);
PaginationInfo = __decorate([
    (0, graphql_1.ObjectType)()
], PaginationInfo);
exports.PaginationInfo = PaginationInfo;
function PaginatedResult(TItemClass) {
    let PaginatedResultClass = class PaginatedResultClass {
    };
    __decorate([
        (0, graphql_1.Field)(type => PaginationInfo),
        (0, graphql_1.Directive)('@shareable'),
        __metadata("design:type", PaginationInfo)
    ], PaginatedResultClass.prototype, "pagination", void 0);
    __decorate([
        (0, graphql_1.Field)(type => [TItemClass]),
        (0, graphql_1.Directive)('@shareable'),
        __metadata("design:type", Array)
    ], PaginatedResultClass.prototype, "results", void 0);
    PaginatedResultClass = __decorate([
        (0, graphql_1.ObjectType)({ isAbstract: true })
    ], PaginatedResultClass);
    return PaginatedResultClass;
}
exports.PaginatedResult = PaginatedResult;
//# sourceMappingURL=pagination.js.map
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
exports.Remboursement = void 0;
const graphql_1 = require("@nestjs/graphql");
const timestamps_entity_1 = require("../../commons/graphql/types/timestamps/timestamps.entity");
const remboursement_status_enum_1 = require("../enums/remboursement-status.enum");
let Remboursement = class Remboursement extends timestamps_entity_1.Timestamps {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", String)
], Remboursement.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], Remboursement.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], Remboursement.prototype, "number", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], Remboursement.prototype, "fees", void 0);
__decorate([
    (0, graphql_1.Field)((type) => remboursement_status_enum_1.RemboursementStatus),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", String)
], Remboursement.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", String)
], Remboursement.prototype, "demandeId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", String)
], Remboursement.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Date)
], Remboursement.prototype, "validatedAt", void 0);
Remboursement = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.Directive)('@key(fields: "id")')
], Remboursement);
exports.Remboursement = Remboursement;
//# sourceMappingURL=remboursement.entity.js.map
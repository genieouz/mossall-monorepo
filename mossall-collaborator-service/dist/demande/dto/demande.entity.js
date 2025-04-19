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
exports.Demande = void 0;
const graphql_1 = require("@nestjs/graphql");
const timestamps_entity_1 = require("../../commons/graphql/types/timestamps/timestamps.entity");
const demande_status_enum_1 = require("../enums/demande-status.enum");
let Demande = class Demande extends timestamps_entity_1.Timestamps {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.ID),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", String)
], Demande.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], Demande.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], Demande.prototype, "number", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], Demande.prototype, "fees", void 0);
__decorate([
    (0, graphql_1.Field)(type => demande_status_enum_1.DemandeStatus),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", String)
], Demande.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Demande.prototype, "rejectedReason", void 0);
Demande = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.Directive)('@key(fields: "id")')
], Demande);
exports.Demande = Demande;
//# sourceMappingURL=demande.entity.js.map
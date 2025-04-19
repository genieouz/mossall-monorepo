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
exports.Organization = void 0;
const graphql_1 = require("@nestjs/graphql");
let Organization = class Organization {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", String)
], Organization.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ description: "Nom de l'organisation" }),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ description: "Email de l'utilisateur racine ou admin" }),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", String)
], Organization.prototype, "rootEmail", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Organization.prototype, "maxDemandeAmount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Organization.prototype, "amountPercent", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Organization.prototype, "fees", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Organization.prototype, "demandeDeadlineDay", void 0);
Organization = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.Directive)('@key(fields: "id")')
], Organization);
exports.Organization = Organization;
//# sourceMappingURL=organization.entity.js.map
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
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const timestamps_entity_1 = require("../../commons/graphql/types/timestamps/timestamps.entity");
const organization_entity_1 = require("../../organization/dto/organization.entity");
const wallet_enum_1 = require("../enums/wallet.enum");
let User = class User extends timestamps_entity_1.Timestamps {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)((type) => organization_entity_1.Organization),
    __metadata("design:type", String)
], User.prototype, "organization", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "uniqueIdentifier", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "salary", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "wizallAccountNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bankAccountNumber", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Float),
    __metadata("design:type", Number)
], User.prototype, "totalDemandeAmount", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "blocked", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, graphql_1.Field)((type) => wallet_enum_1.Wallet, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "favoriteWallet", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "enableEmailNotification", void 0);
User = __decorate([
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map
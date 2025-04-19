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
exports.UpdateCollaboratorInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const wallet_enum_1 = require("../../payment/enums/wallet.enum");
let UpdateCollaboratorInput = class UpdateCollaboratorInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateCollaboratorInput.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateCollaboratorInput.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateCollaboratorInput.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateCollaboratorInput.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateCollaboratorInput.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateCollaboratorInput.prototype, "uniqueIdentifier", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateCollaboratorInput.prototype, "salary", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateCollaboratorInput.prototype, "wizallAccountNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateCollaboratorInput.prototype, "bankAccountNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], UpdateCollaboratorInput.prototype, "birthDate", void 0);
__decorate([
    (0, graphql_1.Field)(type => wallet_enum_1.Wallet, { nullable: true }),
    __metadata("design:type", String)
], UpdateCollaboratorInput.prototype, "favoriteWallet", void 0);
UpdateCollaboratorInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateCollaboratorInput);
exports.UpdateCollaboratorInput = UpdateCollaboratorInput;
//# sourceMappingURL=update-collaborator.input.js.map
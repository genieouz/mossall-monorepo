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
exports.KeycloackAuthResult = void 0;
const graphql_1 = require("@nestjs/graphql");
let KeycloackAuthResult = class KeycloackAuthResult {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true, description: "Null if user must reset his password" }),
    __metadata("design:type", String)
], KeycloackAuthResult.prototype, "access_token", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, description: "Null if user must reset his password" }),
    __metadata("design:type", Number)
], KeycloackAuthResult.prototype, "expires_in", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, description: "Null if user must reset his password" }),
    __metadata("design:type", Number)
], KeycloackAuthResult.prototype, "refresh_expires_in", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, description: "Null if user must reset his password" }),
    __metadata("design:type", String)
], KeycloackAuthResult.prototype, "refresh_token", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, description: "Null if user must reset his password" }),
    __metadata("design:type", String)
], KeycloackAuthResult.prototype, "token_type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, description: "Null if user must reset his password" }),
    __metadata("design:type", String)
], KeycloackAuthResult.prototype, "session_state", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, description: "Null if user must reset his password" }),
    __metadata("design:type", String)
], KeycloackAuthResult.prototype, "scope", void 0);
KeycloackAuthResult = __decorate([
    (0, graphql_1.ObjectType)()
], KeycloackAuthResult);
exports.KeycloackAuthResult = KeycloackAuthResult;
//# sourceMappingURL=keycloak-auth-result.js.map
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
exports.Session = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../users/dto/user.entity");
const keycloak_auth_result_1 = require("./keycloak-auth-result");
let Session = class Session extends keycloak_auth_result_1.KeycloackAuthResult {
};
__decorate([
    (0, graphql_1.Field)(type => user_entity_1.User, { nullable: true, description: "Null if user must reset his password" }),
    __metadata("design:type", Object)
], Session.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, description: "Not null if user must reset his password. Null other cases" }),
    __metadata("design:type", String)
], Session.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)({ description: "False if user must reset his password" }),
    __metadata("design:type", Boolean)
], Session.prototype, "enabled", void 0);
Session = __decorate([
    (0, graphql_1.ObjectType)()
], Session);
exports.Session = Session;
//# sourceMappingURL=session.type.js.map
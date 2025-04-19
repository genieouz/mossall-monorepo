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
exports.SessionPropertyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const session_type_1 = require("./dto/session.type");
const jwt = require("jsonwebtoken");
const user_service_1 = require("../users/user.service");
const user_entity_1 = require("../users/dto/user.entity");
let SessionPropertyResolver = class SessionPropertyResolver {
    constructor(userService) {
        this.userService = userService;
    }
    user(session) {
        const decodedToken = jwt.decode(session.access_token);
        if (!decodedToken) {
            return null;
        }
        return this.userService.findOne({ email: decodedToken.email });
    }
};
__decorate([
    (0, graphql_1.ResolveField)((returns) => user_entity_1.User),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_type_1.Session]),
    __metadata("design:returntype", void 0)
], SessionPropertyResolver.prototype, "user", null);
SessionPropertyResolver = __decorate([
    (0, graphql_1.Resolver)((of) => session_type_1.Session),
    __metadata("design:paramtypes", [user_service_1.UserService])
], SessionPropertyResolver);
exports.SessionPropertyResolver = SessionPropertyResolver;
//# sourceMappingURL=session-property.resolver.js.map
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
exports.Timestamps = void 0;
const graphql_1 = require("@nestjs/graphql");
let Timestamps = class Timestamps {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Date)
], Timestamps.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Date)
], Timestamps.prototype, "updatedAt", void 0);
Timestamps = __decorate([
    (0, graphql_1.ObjectType)()
], Timestamps);
exports.Timestamps = Timestamps;
//# sourceMappingURL=timestamps.entity.js.map
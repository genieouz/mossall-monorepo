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
exports.PaginatedActivityResult = exports.Activity = void 0;
const graphql_1 = require("@nestjs/graphql");
const pagination_1 = require("../../commons/graphql/pagination");
const any_scalar_1 = require("../../commons/graphql/scalars/any.scalar");
const timestamps_entity_1 = require("../../commons/graphql/types/timestamps/timestamps.entity");
const organization_entity_1 = require("../../organization/dto/organization.entity");
const user_entity_1 = require("../../users/dto/user.entity");
const activity_scope_enum_1 = require("../enums/activity-scope.enum");
let Activity = class Activity extends timestamps_entity_1.Timestamps {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.ID),
    __metadata("design:type", String)
], Activity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Activity.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(type => any_scalar_1.Any, { nullable: true }),
    __metadata("design:type", Object)
], Activity.prototype, "initialValue", void 0);
__decorate([
    (0, graphql_1.Field)(type => any_scalar_1.Any, { nullable: true }),
    __metadata("design:type", Object)
], Activity.prototype, "currentValue", void 0);
__decorate([
    (0, graphql_1.Field)(type => any_scalar_1.Any, { nullable: true }),
    __metadata("design:type", Object)
], Activity.prototype, "meta", void 0);
__decorate([
    (0, graphql_1.Field)(type => user_entity_1.User),
    __metadata("design:type", Object)
], Activity.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(type => activity_scope_enum_1.ActivityScope),
    __metadata("design:type", String)
], Activity.prototype, "scope", void 0);
__decorate([
    (0, graphql_1.Field)(type => organization_entity_1.Organization),
    __metadata("design:type", Object)
], Activity.prototype, "organization", void 0);
Activity = __decorate([
    (0, graphql_1.ObjectType)()
], Activity);
exports.Activity = Activity;
let PaginatedActivityResult = class PaginatedActivityResult extends (0, pagination_1.PaginatedResult)(Activity) {
};
PaginatedActivityResult = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedActivityResult);
exports.PaginatedActivityResult = PaginatedActivityResult;
//# sourceMappingURL=activity.entity.js.map
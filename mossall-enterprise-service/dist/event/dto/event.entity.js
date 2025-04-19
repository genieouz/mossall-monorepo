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
exports.PaginatedEventResult = exports.Event = void 0;
const graphql_1 = require("@nestjs/graphql");
const pagination_1 = require("../../commons/graphql/pagination");
const timestamps_entity_1 = require("../../commons/graphql/types/timestamps/timestamps.entity");
const any_scalar_1 = require("../../commons/graphql/scalars/any.scalar");
const enum_1 = require("../../commons/enum");
let Event = class Event extends timestamps_entity_1.Timestamps {
};
__decorate([
    (0, graphql_1.Field)((type) => any_scalar_1.Any),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Date),
    __metadata("design:type", String)
], Event.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Date),
    __metadata("design:type", String)
], Event.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Event.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)((type) => enum_1.AmountUnit),
    __metadata("design:type", String)
], Event.prototype, "amountUnit", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Event.prototype, "refundDuration", void 0);
__decorate([
    (0, graphql_1.Field)((type) => enum_1.DurationUnit),
    __metadata("design:type", String)
], Event.prototype, "refundDurationUnit", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Event.prototype, "activated", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Date, { nullable: true }),
    __metadata("design:type", Date)
], Event.prototype, "activatedAt", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Boolean),
    __metadata("design:type", Boolean)
], Event.prototype, "autoValidate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "addedBy", void 0);
Event = __decorate([
    (0, graphql_1.ObjectType)()
], Event);
exports.Event = Event;
let PaginatedEventResult = class PaginatedEventResult extends (0, pagination_1.PaginatedResult)(Event) {
};
PaginatedEventResult = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedEventResult);
exports.PaginatedEventResult = PaginatedEventResult;
//# sourceMappingURL=event.entity.js.map
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
exports.UploadUserResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class UploadUserResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12 }),
    __metadata("design:type", Number)
], UploadUserResponse.prototype, "totalErrors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], UploadUserResponse.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['email is required'] }),
    __metadata("design:type", Array)
], UploadUserResponse.prototype, "errors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12 }),
    __metadata("design:type", Number)
], UploadUserResponse.prototype, "totalSuccess", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                error: true,
                message: 'email is required',
                errorsArray: ['email is required'],
            },
        ],
    }),
    __metadata("design:type", Array)
], UploadUserResponse.prototype, "errorsArray", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                createdAt: '2022-06-02T16:41:35.000Z',
                updatedAt: '2022-06-02T16:41:35.000Z',
                id: '62a7c7c8d9e7b4a5f0b6c7d8',
                email: 'qG0X6@example.com',
                balance: 0,
                totalDemandeAmount: 0,
                error: true,
                errorsArray: ['email is required'],
            },
        ],
    }),
    __metadata("design:type", Object)
], UploadUserResponse.prototype, "dataRows", void 0);
exports.UploadUserResponse = UploadUserResponse;
//# sourceMappingURL=user.interface.js.map
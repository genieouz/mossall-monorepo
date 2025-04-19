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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const auth_guard_1 = require("../../../auth/auth.guard");
const constant_1 = require("../../../auth/constant");
const current_organization_decorator_1 = require("../../../organization/decorators/current-organization.decorator");
const user_role_enum_1 = require("../../enums/user-role.enum");
const file_upload_service_1 = require("../../file.upload.service");
const user_interface_1 = require("../../schemas/interfaces/user.interface");
let UsersController = class UsersController {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    async addUsers(payload, file, organization, type) {
        return this.fileUploadService.uploadCsvFile(file, organization.id, type);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Upload XLSX file' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The upload file has been successfully done.',
        type: user_interface_1.UploadUserResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: `XLSX file containing user data \n the format is: \n
   Prénom   |  Nom   |  Adresse e-mail   |  Date de naissance      |  adresse     |  Identifiant unique   |  salaire   |  Compte bancaire   |  Téléphone | Fonction`,
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'XSLX',
                    format: '.xlsx',
                },
            },
        },
    }),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './files',
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({
                fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            }),
        ],
    }))),
    __param(2, (0, current_organization_decorator_1.CurrentOrganization)()),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUsers", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)(constant_1.TOKEN_NAME),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map
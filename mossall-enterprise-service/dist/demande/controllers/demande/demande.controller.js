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
exports.DemandeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const auth_guard_1 = require("../../../auth/auth.guard");
const constant_1 = require("../../../auth/constant");
const collab_api_decorator_1 = require("../../../auth/decorators/collab-api.decorator");
const current_user_decorator_1 = require("../../../auth/decorators/current-user.decorator");
const demande_file_service_1 = require("../../services/demande-file.service");
const demande_service_1 = require("../../services/demande.service");
const current_organization_decorator_1 = require("../../../organization/decorators/current-organization.decorator");
const user_interface_1 = require("../../../users/schemas/interfaces/user.interface");
let DemandeController = class DemandeController {
    constructor(demandeFileService, demandeService) {
        this.demandeFileService = demandeFileService;
        this.demandeService = demandeService;
    }
    async uploadDemandes(payload, file, organization, user) {
        return this.demandeFileService.uploadFile(file, organization, user);
    }
    async autoValidateDemandes(payload) {
        const { demandeId, user } = payload;
        return this.demandeService.validate(demandeId, user, true);
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
        description: `XLSX file containing request of collaborators \n the format is: \n
   Prénom   |  Nom   |  Email    |  Identifiant unique    |  Telephone | Avance renboursée`,
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
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DemandeController.prototype, "uploadDemandes", null);
__decorate([
    (0, collab_api_decorator_1.CollabApi)(),
    (0, common_1.Post)('autovalidate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandeController.prototype, "autoValidateDemandes", null);
DemandeController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)('demande'),
    (0, swagger_1.ApiBearerAuth)(constant_1.TOKEN_NAME),
    (0, common_1.Controller)('demande'),
    __metadata("design:paramtypes", [demande_file_service_1.DemandeFileService,
        demande_service_1.DemandeService])
], DemandeController);
exports.DemandeController = DemandeController;
//# sourceMappingURL=demande.controller.js.map
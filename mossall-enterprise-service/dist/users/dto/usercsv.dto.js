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
exports.UserCSVDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UserCSVDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Prénom est obligatoire' }),
    (0, class_validator_1.IsString)({ message: 'Prénom doit être une chaine de caractères' }),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Prénom doit être une chaine de caractères' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nom est obligatoire' }),
    (0, class_validator_1.IsString)({ message: 'Nom doit être une chaine de caractères' }),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email est obligatoire' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email doit être valide' }),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Date de naissance est obligatoire' }),
    (0, class_validator_1.IsDate)({ message: 'Date de naissance doit être une date' }),
    __metadata("design:type", Object)
], UserCSVDTO.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Téléphone est obligatoire' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value)),
    (0, class_validator_1.IsString)({ message: 'Téléphone doit être une chaine de caractères' }),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Adresse est obligatoire' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value)),
    (0, class_validator_1.IsString)({ message: 'Adresse doit être une chaine de caractères' }),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Identifiant unique est obligatoire' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value)),
    (0, class_validator_1.IsString)({
        message: 'Identifiant unique doit être une chaine de caractères',
    }),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "uniqueIdentifier", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Fonction est obligatoire' }),
    (0, class_validator_1.IsString)({ message: 'Fonction doit être une chaine de caractères' }),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UserCSVDTO.prototype, "organization", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "realm", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Salaire est obligatoire' }),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : value)),
    (0, class_validator_1.IsNumber)({}, { message: 'Salaire doit être un nombre' }),
    __metadata("design:type", Number)
], UserCSVDTO.prototype, "salary", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "enableEmailNotification", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Catégorie socioprofessionnelle est obligatoire' }),
    __metadata("design:type", String)
], UserCSVDTO.prototype, "categorySocioPro", void 0);
exports.UserCSVDTO = UserCSVDTO;
//# sourceMappingURL=usercsv.dto.js.map
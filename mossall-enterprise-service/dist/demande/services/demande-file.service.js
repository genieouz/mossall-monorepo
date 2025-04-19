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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DemandeFileService_logger;
var DemandeFileService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeFileService = void 0;
const common_1 = require("@nestjs/common");
const xlsx = require("xlsx");
const fs_1 = require("fs");
const demande_dto_1 = require("../dto/demande.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const demande_service_1 = require("./demande.service");
const user_service_1 = require("../../users/user.service");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
const demande_status_enum_1 = require("../enums/demande-status.enum");
const service_service_1 = require("../../service/services/service.service");
const organisation_service_service_1 = require("../../organisation-service/services/organisation-service.service");
const bson_1 = require("bson");
const demande_utils_1 = require("../demande.utils");
let DemandeFileService = DemandeFileService_1 = class DemandeFileService {
    constructor(demandeService, userService, organisationService, produitService) {
        this.demandeService = demandeService;
        this.userService = userService;
        this.organisationService = organisationService;
        this.produitService = produitService;
        _DemandeFileService_logger.set(this, void 0);
        __classPrivateFieldSet(this, _DemandeFileService_logger, new common_1.Logger(`🖇️${DemandeFileService_1.name}🖇️`), "f");
    }
    async uploadFile(file, organization, admin) {
        try {
            __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log(`uploading file demande`);
            let response = await this.validateXlsxData(file, organization.id);
            let { data, errorsArray, nbRowErrors, total_rows, nbRowsSuccess } = response;
            __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log('data validated');
            if (data.length !== data.filter((item) => item.error).length) {
                __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log('processing file');
                return this.processFile(data, admin, organization);
            }
            __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log('returning error');
            return {
                error: true,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'errors on data',
                errorsArray,
                data,
                nbRowErrors,
                total_rows,
                nbRowsSuccess,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException((error === null || error === void 0 ? void 0 : error.message) || 'Internal Server Error');
        }
    }
    async validateXlsxData(file, organization) {
        const workbook = xlsx.readFile(file.path, { cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = xlsx.utils.sheet_to_json(sheet, {
            header: 1,
            defval: '',
        });
        const filteredData = parsedData.filter((row) => row.some((cell) => typeof cell === 'string' ? cell.trim() !== '' : cell !== ''));
        const errors = [];
        __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log(`validating file rows ${parsedData.length}`);
        if (filteredData.length <= 1) {
            errors.push('Empty File Provided');
            (0, fs_1.unlink)(file.path, () => { });
            return {
                error: true,
                message: 'File Validation Failed',
                errorsArray: errors,
                valid: false,
            };
        }
        const headers = parsedData[0];
        const errorRows = [];
        const data = [];
        for (const [index, rowData] of filteredData.slice(1).entries()) {
            const mappedRowData = this.mapRowToDataObject(rowData, headers);
            const { errors: validationErrors, data: dataValidated } = await this.validateFileRow(mappedRowData, organization);
            data.push(Object.assign(Object.assign({}, dataValidated), { error: false, errorsArray: [] }));
            __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log(`validating row ${index + 1}`);
            if (validationErrors === null || validationErrors === void 0 ? void 0 : validationErrors.length) {
                data[index] = Object.assign(Object.assign({}, data[index]), { error: true, errorsArray: validationErrors });
                errorRows.push({
                    error: true,
                    message: `File Rows Validation Failed at row: ${index + 1}`,
                    errorsArray: validationErrors,
                });
            }
        }
        (0, fs_1.unlink)(file.path, () => { });
        return {
            data,
            errorsArray: errorRows,
            nbRowErrors: errorRows.length,
            total_rows: data.length,
            nbRowsSuccess: data.length - errorRows.length,
        };
    }
    mapRowToDataObject(row, headers) {
        const mappedRowData = {};
        headers.forEach((header, index) => {
            mappedRowData[header] = row[index];
        });
        return mappedRowData;
    }
    async validateFileRow(rowData, organization) {
        const errors = [];
        const mappedRowData = {
            firstName: rowData['Prenom'],
            lastName: rowData['Nom'],
            email: rowData['Email'],
            uniqueIdentifier: rowData['Identifiant unique'],
            phoneNumber: rowData['Telephone'],
            amount: rowData['Montant'],
            versed: rowData['Avance renboursée'],
            service: rowData['Service'],
            organization,
        };
        __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log('converting to instance DemandeDto');
        const csvDto = (0, class_transformer_1.plainToInstance)(demande_dto_1.DemandeDto, mappedRowData);
        csvDto.organization = organization;
        const validationErrors = await (0, class_validator_1.validate)(csvDto);
        __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log(`Validation errors: ${JSON.stringify(validationErrors)}`);
        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => {
                const { property, constraints } = error;
                const errorMessage = `${property}: ${Object.values(constraints).join(', ')}`;
                errors.push(errorMessage);
            });
        }
        return { errors, data: csvDto };
    }
    async processFile(dataRows, admin, organization) {
        __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log(`processing file demande`);
        const processedRows = await Promise.all(dataRows.map(async (row) => {
            const errors = [];
            const user = await this.userService.findOne({
                $and: [
                    { email: row.email },
                    { uniqueIdentifier: row.uniqueIdentifier },
                    { phoneNumber: row.phoneNumber },
                    { role: user_role_enum_1.UserRole.COLLABORATOR },
                ],
            });
            if (!user) {
                errors.push(`Aucun utilisateur trouvé avec cet email: ${row.email}, identifiant: ${row.uniqueIdentifier} et téléphone: ${row.phoneNumber}`);
                return Object.assign(Object.assign({}, row), { error: true, errorsArray: errors });
            }
            if (user.firstName !== row.firstName ||
                user.lastName !== row.lastName) {
                errors.push(`Le nom et prénom ne correspondent pas pour l'utilisateur ${row.email}`);
                return Object.assign(Object.assign({}, row), { error: true, errorsArray: errors });
            }
            __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log(`Find service ${row.service}`);
            const serviceCorresponding = await this.produitService.findOne({
                title: row.service.trim(),
            });
            if (!serviceCorresponding) {
                __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log(`Service not found ${row.service}`);
                errors.push(`Aucun service trouvé avec ce nom ${row.service}`);
                return Object.assign(Object.assign({}, row), { error: true, errorsArray: errors });
            }
            const organizationServiceCorresponding = await this.organisationService.findOne({
                serviceId: new bson_1.ObjectId(serviceCorresponding.id),
                organizationId: admin.organization,
            });
            if (!organizationServiceCorresponding) {
                errors.push(`Aucune organisation  trouvé avec une service  ${row.service}`);
                return Object.assign(Object.assign({}, row), { error: true, errorsArray: errors });
            }
            const { demandeDeadlineDay } = organization;
            const startDate = new Date();
            startDate.setDate(demandeDeadlineDay);
            startDate.setMonth(startDate.getMonth() - 1);
            const endDate = new Date();
            endDate.setDate(demandeDeadlineDay);
            const demande = await this.getDemandeOnOneService(user._id, organizationServiceCorresponding.id, demande_status_enum_1.DemandeStatus.VALIDATED, { startDate, endDate });
            console.log('demande', demande);
            if (demande && (demande === null || demande === void 0 ? void 0 : demande.amount) !== row.amount) {
                errors.push(`Le montant total des demandes (${demande.amount}) ne correspond pas au montant indiqué (${row.amount})`);
                return Object.assign(Object.assign({}, row), { error: true, errorsArray: errors });
            }
            const userDemands = await this.demandeService.findMany({
                owner: user._id,
                organizationServiceId: organizationServiceCorresponding._id,
                status: demande_status_enum_1.DemandeStatus.VALIDATED,
                createdAt: { $gte: startDate, $lt: endDate },
            });
            if (row.versed) {
                try {
                    for (const demand of userDemands) {
                        await this.demandeService.paye(demand._id, admin);
                    }
                    return Object.assign(Object.assign({}, row), { error: false, errorsArray: [] });
                }
                catch (error) {
                    errors.push(`Erreur lors du paiement: ${error.message}`);
                    return Object.assign(Object.assign({}, row), { error: true, errorsArray: errors });
                }
            }
            else {
                errors.push(`Aucun montant versé spécifié pour ${row.email}`);
                return Object.assign(Object.assign({}, row), { error: true, errorsArray: errors });
            }
        }));
        __classPrivateFieldGet(this, _DemandeFileService_logger, "f").log(`Finished processing ${processedRows.length} rows`);
        return {
            data: processedRows,
            totalProcessed: processedRows.length,
            successCount: processedRows.filter((row) => !row.error).length,
            errorCount: processedRows.filter((row) => row.error).length,
        };
    }
    async getDemandeOnOneService(owner, organizationServiceId, status, date) {
        console.log({
            owner: new bson_1.ObjectId(owner),
            organizationServiceId: new bson_1.ObjectId(organizationServiceId),
            status,
            createdAt: {
                $gte: new Date(date.startDate),
                $lt: new Date(date.endDate),
            },
        });
        return this.demandeService.aggregateOne([
            {
                $match: {
                    owner: new bson_1.ObjectId(owner),
                    organizationServiceId: new bson_1.ObjectId(organizationServiceId),
                    status,
                    createdAt: {
                        $gte: new Date(date.startDate),
                        $lt: new Date(date.endDate),
                    },
                },
            },
            {
                $project: {
                    owner: 1,
                    organizationServiceId: 1,
                    amount: {
                        $add: ['$amount', { $multiply: ['$amount', demande_utils_1.WaveFees] }],
                    },
                },
            },
            {
                $group: {
                    _id: {
                        owner: '$owner',
                        organizationServiceId: '$organizationServiceId',
                    },
                    amount: { $sum: '$amount' },
                },
            },
            {
                $project: {
                    _id: 0,
                    owner: '$_id.owner',
                    organizationServiceId: '$_id.organizationServiceId',
                    amount: 1,
                },
            },
        ]);
    }
};
_DemandeFileService_logger = new WeakMap();
DemandeFileService = DemandeFileService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [demande_service_1.DemandeService,
        user_service_1.UserService,
        organisation_service_service_1.OrganisationServiceService,
        service_service_1.ServiceService])
], DemandeFileService);
exports.DemandeFileService = DemandeFileService;
//# sourceMappingURL=demande-file.service.js.map
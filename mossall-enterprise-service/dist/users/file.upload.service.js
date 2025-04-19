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
var _FileUploadService_logger;
var FileUploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const usercsv_dto_1 = require("./dto/usercsv.dto");
const fs_1 = require("fs");
const user_service_1 = require("./user.service");
const moment = require("moment");
const bcrypt = require("bcrypt");
const bson_1 = require("bson");
const utils_1 = require("../commons/utils");
const event_emitter_1 = require("@nestjs/event-emitter");
const xlsx = require("xlsx");
const user_role_enum_1 = require("./enums/user-role.enum");
const category_sociopro_service_1 = require("../category-sociopro/services/category-sociopro.service");
let FileUploadService = FileUploadService_1 = class FileUploadService {
    constructor(userService, eventEmitter, categoryService) {
        this.userService = userService;
        this.eventEmitter = eventEmitter;
        this.categoryService = categoryService;
        _FileUploadService_logger.set(this, void 0);
        __classPrivateFieldSet(this, _FileUploadService_logger, new common_1.Logger(`🖇️ ${FileUploadService_1.name}Service🖇️`), "f");
    }
    async validateFileRow(rowData, organization, type) {
        const errors = [];
        const mappedRowData = {
            firstName: rowData['Prénom'],
            lastName: rowData['Nom'],
            email: rowData['Adresse mail'],
            phoneNumber: rowData['Numéro téléphone'],
            address: rowData['Adresse postale'],
            uniqueIdentifier: rowData['Matricule'],
            position: rowData['Fonction'],
            birthDate: rowData['Date de naissance'],
            salary: rowData['Salaire'],
            categorySocioPro: rowData['Catégorie socioprofessionnelle'],
            realm: type == user_role_enum_1.UserRole.COLLABORATOR
                ? 'mossall_collaborators'
                : 'mossall_admin',
        };
        const phoneRegex = /^(78|77|76|70|75)\d{7}$/;
        if (rowData['Téléphone'] && !phoneRegex.test(rowData['Téléphone'])) {
            errors.push(`Le numéro de téléphone ${rowData['Téléphone']} est invalide. Il doit commencer par 70, 75, 76, 77 ou 78 et avoir 9 chiffres au total`);
        }
        if (rowData['Catégorie socioprofessionnelle']) {
            const category = await this.categoryService.findOne({
                title: {
                    $regex: new RegExp(rowData['Catégorie socioprofessionnelle'].trim(), 'i'),
                },
            });
            mappedRowData.categorySocioPro = category === null || category === void 0 ? void 0 : category._id;
            if (!category) {
                errors.push(`La catégorie socioprofessionnelle ${rowData['Catégorie socioprofessionnelle']} n'existe pas`);
            }
        }
        const csvDto = this.mapToUserDto(mappedRowData, organization, type);
        const validationErrors = await (0, class_validator_1.validate)(csvDto);
        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => {
                const { property, constraints } = error;
                const errorMessage = `${property}: ${Object.values(constraints).join(', ')}`;
                errors.push(errorMessage);
            });
        }
        return { errors, data: csvDto };
    }
    mapToUserDto(rowData, organization, type) {
        const csvDto = (0, class_transformer_1.plainToInstance)(usercsv_dto_1.UserCSVDTO, rowData);
        csvDto.role = type;
        csvDto.organization = organization;
        csvDto.password = (0, utils_1.generatePassword)(12, {
            numbers: true,
            uppercase: true,
            symbols: true,
        });
        csvDto.birthDate = moment(csvDto.birthDate, 'DD-MM-YYYY').toDate();
        csvDto.categorySocioPro = rowData.categorySocioPro;
        return csvDto;
    }
    mapRowToDataObject(row, headers) {
        const mappedRowData = {};
        headers.forEach((header, index) => {
            mappedRowData[header] = row[index];
        });
        return mappedRowData;
    }
    async validateXlsxData(file, organization, type) {
        const workbook = xlsx.readFile(file.path, { cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = xlsx.utils.sheet_to_json(sheet, {
            header: 1,
            defval: '',
        });
        const filteredData = parsedData.filter((row) => row.some((cell) => typeof cell === 'string' ? cell.trim() !== '' : cell !== ''));
        const errors = [];
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
            const { errors: validationErrors, data: dataValidated } = await this.validateFileRow(mappedRowData, organization, type);
            data.push(Object.assign(Object.assign({}, dataValidated), { error: false, errorsArray: [] }));
            if (validationErrors.length) {
                data[index] = Object.assign(Object.assign({}, data[index]), { error: true, errorsArray: validationErrors });
                errorRows.push({
                    error: true,
                    message: `File Rows Validation Failed at row: ${index + 2}`,
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
    async uploadCsvFile(file, organization, type) {
        try {
            __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('uploading csv file');
            let response = await this.validateXlsxData(file, organization, type);
            let { data, errorsArray, nbRowErrors, total_rows, nbRowsSuccess } = response;
            __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('data validated');
            if (data.length) {
                __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('processing file');
                return this.processFile(data);
            }
            __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('returning error');
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
        catch (e) {
            throw new common_1.InternalServerErrorException((e === null || e === void 0 ? void 0 : e.message) || 'Internal Server Error');
        }
    }
    async processFile(dataRows) {
        var _a;
        const emails = dataRows.map((row) => row.email);
        __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('processing file with ' + emails.length + ' rows');
        const { dataRows: existingInfoUsers, errorRows: errorRows } = await this.checkDuplicateRows(dataRows);
        __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('inserting rows in database');
        const dataToinsert = existingInfoUsers.filter((row) => row.error == false);
        const rowsInserted = await this.insertRowsInDb(dataToinsert);
        const totalErrors = (_a = existingInfoUsers.filter((item) => item.error)) === null || _a === void 0 ? void 0 : _a.length;
        return {
            message: errorRows.length > 0
                ? 'errors on data'
                : 'file validation successfully done.Insert data is successfully done. ',
            data: dataRows.map((row) => {
                if (!row.error) {
                    const temp = rowsInserted.find((item) => item.email === row.email);
                    row = Object.assign(Object.assign({}, row), { createdAt: temp === null || temp === void 0 ? void 0 : temp.createdAt, updatedAt: temp === null || temp === void 0 ? void 0 : temp.updatedAt, id: temp === null || temp === void 0 ? void 0 : temp._id, balance: temp === null || temp === void 0 ? void 0 : temp.balance, totalDemandeAmount: temp === null || temp === void 0 ? void 0 : temp.totalDemandeAmount });
                }
                delete row.password;
                return row;
            }),
            error: !!existingInfoUsers.length,
            errorsArray: errorRows,
            totalRows: dataRows.length,
            totalErrors,
            totalSuccess: dataRows.length - totalErrors,
        };
    }
    async insertRowsInDb(dataRows) {
        __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('inserting rows in database');
        __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('data to insert: ' + dataRows.length);
        let response = [];
        if (dataRows.length) {
            __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('file inserted in database' + dataRows.map((row) => row.email));
            response = await this.userService.insertMany(dataRows.map((row) => {
                const temp = Object.assign(Object.assign({}, row), { password: bcrypt.hashSync(row.password, 10) });
                delete temp.error;
                delete temp.errorsArray;
                return temp;
            }));
            dataRows.forEach((row) => {
                __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('emitting event sending email and password to ' + row.email);
                this.eventEmitter.emit('collaborator.invite', {
                    email: row.email,
                    password: row.password,
                });
            });
        }
        const rowsInserted = await this.userService.findMany({
            email: { $in: response.map((row) => row.email) },
        });
        return rowsInserted;
    }
    async checkDuplicateRows(dataRows) {
        __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('Vérification des doublons dans les lignes du fichier');
        let tempData = [...dataRows];
        const errorRows = [];
        const existingInfoUsers = await this.userService.findMany({
            $or: [
                {
                    $and: [
                        { phoneNumber: { $in: dataRows.map((row) => row.phoneNumber) } },
                        { realm: 'mossall_collaborators' },
                        { organization: new bson_1.ObjectId(dataRows[0].organization) },
                    ],
                },
                { email: { $in: dataRows.map((row) => row.email) } },
                {
                    uniqueIdentifier: {
                        $in: dataRows.map((row) => row.uniqueIdentifier),
                    },
                },
            ],
        });
        __classPrivateFieldGet(this, _FileUploadService_logger, "f").log('file processed with ' + existingInfoUsers.length + ' rows');
        if (existingInfoUsers.length > 0) {
            tempData = tempData.map((row, index) => {
                const duplicates = [];
                const duplicatePhone = existingInfoUsers.find((user) => user.phoneNumber === row.phoneNumber &&
                    (user.realm === 'mossall_collaborators' || user.realm) &&
                    user.organization.toString() === row.organization);
                if (duplicatePhone) {
                    duplicates.push(`Le numéro de téléphone ${row.phoneNumber} existe déjà`);
                }
                const duplicateEmail = existingInfoUsers.find((user) => user.email === row.email);
                if (duplicateEmail) {
                    duplicates.push(`L'email ${row.email} existe déjà`);
                }
                const duplicateIdentifier = existingInfoUsers.find((user) => user.uniqueIdentifier === row.uniqueIdentifier &&
                    user.realm === 'mossall_collaborators' &&
                    user.organization.toString() === row.organization);
                if (duplicateIdentifier) {
                    duplicates.push(`L'identifiant unique ${row.uniqueIdentifier} existe déjà`);
                }
                if (duplicates.length > 0) {
                    errorRows.push({
                        error: true,
                        message: 'Données en double détectées',
                        errorsArray: duplicates,
                    });
                    dataRows[index].error = true;
                    dataRows[index].errorsArray = duplicates;
                }
                return dataRows[index];
            });
        }
        return {
            dataRows: tempData,
            errorRows,
        };
    }
};
_FileUploadService_logger = new WeakMap();
FileUploadService = FileUploadService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        event_emitter_1.EventEmitter2,
        category_sociopro_service_1.CategorySocioproService])
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file.upload.service.js.map
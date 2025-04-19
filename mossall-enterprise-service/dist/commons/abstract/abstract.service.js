"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
class AbstractService {
    constructor(model, searchFields = []) {
        this.searchFields = [];
        this.abstractModel = model;
        this.searchFields = searchFields;
    }
    parseSearchField(field) {
        if (field.includes('.')) {
            const [path, searchableFields, ...additionalFields] = field.split(':');
            const parts = path.split('.');
            if (parts.length === 3) {
                const parsedSearchableFields = searchableFields
                    .split(',')
                    .map((field) => (field.includes('+') ? field.split('+') : field));
                return {
                    isComplex: true,
                    parsed: {
                        foreignCollection: parts[0],
                        localField: parts[1],
                        foreignField: parts[2],
                        searchableFields: parsedSearchableFields,
                        additionalFields: additionalFields.map((field) => {
                            const [fieldName, fieldType = 'string'] = field.split('|');
                            return {
                                field: fieldName,
                                type: fieldType,
                            };
                        }),
                    },
                };
            }
        }
        return {
            isComplex: false,
            parsed: field,
        };
    }
    createSearchCondition(field, search, type = 'string') {
        if (type === 'number') {
            return {
                $or: [
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $toString: `$${field}` },
                                regex: search,
                                options: 'i',
                            },
                        },
                    },
                    ...(!isNaN(Number(search)) ? [{ [field]: Number(search) }] : []),
                ],
            };
        }
        return {
            [field]: { $regex: (0, utils_1.diacriticSensitiveRegex)(search), $options: 'i' },
        };
    }
    async findManyAndPaginate(queryFilter = {}, queryConfig) {
        const { limit, page = 1, orderBy, search, } = (0, utils_1.normalizeQueryDataConfig)(queryConfig);
        const lookupStages = new Set();
        const searchConditions = [];
        if (search && search.trim().length) {
            this.searchFields.forEach((field) => {
                var _a;
                const { isComplex, parsed } = this.parseSearchField(field);
                if (!isComplex) {
                    const [fieldName, fieldType = 'string'] = field.split('|');
                    searchConditions.push(this.createSearchCondition(fieldName, search, fieldType));
                }
                else {
                    const parsedField = parsed;
                    lookupStages.add({
                        $lookup: {
                            from: parsedField.foreignCollection,
                            localField: parsedField.localField,
                            foreignField: parsedField.foreignField,
                            as: `${parsedField.foreignCollection}_lookup`,
                        },
                    });
                    lookupStages.add({
                        $unwind: {
                            path: `$${parsedField.foreignCollection}_lookup`,
                            preserveNullAndEmptyArrays: true,
                        },
                    });
                    parsedField.searchableFields.forEach((field) => {
                        if (Array.isArray(field)) {
                            const combinedFieldName = `combined_${field.join('_')}`;
                            lookupStages.add({
                                $addFields: {
                                    [combinedFieldName]: {
                                        $concat: [
                                            `$${parsedField.foreignCollection}_lookup.${field[0]}`,
                                            ' ',
                                            `$${parsedField.foreignCollection}_lookup.${field[1]}`,
                                        ],
                                    },
                                },
                            });
                            searchConditions.push({
                                [combinedFieldName]: {
                                    $regex: (0, utils_1.diacriticSensitiveRegex)(search),
                                    $options: 'i',
                                },
                            });
                        }
                        else {
                            searchConditions.push({
                                [`${parsedField.foreignCollection}_lookup.${field}`]: {
                                    $regex: (0, utils_1.diacriticSensitiveRegex)(search),
                                    $options: 'i',
                                },
                            });
                        }
                    });
                    if ((_a = parsedField.additionalFields) === null || _a === void 0 ? void 0 : _a.length) {
                        parsedField.additionalFields.forEach(({ field, type }) => {
                            searchConditions.push(this.createSearchCondition(field, search, type));
                        });
                    }
                }
            });
        }
        const matchStage = {
            $match: Object.assign(Object.assign({}, queryFilter), (searchConditions.length ? { $or: searchConditions } : {})),
        };
        const groupStage = {
            $group: {
                _id: '$_id',
                doc: { $first: '$$ROOT' },
            },
        };
        const totalItems = await this.aggregateTotal([
            ...Array.from(lookupStages),
            matchStage,
            groupStage,
            { $count: 'total' },
        ]);
        const skip = (page - 1) * limit;
        const results = await this.abstractModel.aggregate([
            ...Array.from(lookupStages),
            matchStage,
            groupStage,
            { $replaceRoot: { newRoot: '$doc' } },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            { $set: { id: '$_id' } },
        ]);
        const pageCount = Math.ceil(totalItems / limit);
        const currentPage = page;
        const pageSize = results.length;
        const pagination = {
            totalItems,
            pageCount,
            currentPage,
            pageSize,
        };
        return { results, pagination };
    }
    insertOne(payload) {
        return this.abstractModel.create(payload);
    }
    insertMany(payload) {
        return this.abstractModel.insertMany(payload);
    }
    async findMany(queryFilter = {}, queryConfig) {
        return this.abstractModel.find(queryFilter);
    }
    async count(queryFilter = {}) {
        return this.abstractModel.countDocuments(queryFilter);
    }
    async findOneById(id) {
        return this.abstractModel.findById(id);
    }
    async findOne(queryFilter) {
        return this.abstractModel.findOne(queryFilter);
    }
    async findOneOrFail(queryFilter) {
        const result = await this.findOne(queryFilter);
        if (!result) {
            throw new common_1.NotFoundException(`Aucun élément trouvé`);
        }
        return result;
    }
    async findOneByIdOrFail(id) {
        const result = await this.findOneById(id);
        if (!result) {
            throw new common_1.NotFoundException(`L'élément n'existe pas`);
        }
        return result;
    }
    async findByIdAndUpdate(id, payload) {
        const result = await this.abstractModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        if (!result) {
            throw new common_1.NotFoundException(`Not found`);
        }
        return result;
    }
    async findOneAndUpdate(queryFilter, payload) {
        const result = await this.abstractModel.findOneAndUpdate(queryFilter, { $set: payload }, { new: true });
        if (!result) {
            throw new common_1.NotFoundException(`Not found`);
        }
        return result;
    }
    async updateOneById(id, payload) {
        const result = await this.abstractModel.updateOne({ _id: id }, { $set: payload });
        return Boolean(result.modifiedCount);
    }
    async updateOne(query, payload) {
        const result = await this.abstractModel.updateOne(query, { $set: payload });
        return Boolean(result.modifiedCount);
    }
    async deleteOneById(id) {
        const result = await this.abstractModel.deleteOne({ _id: id });
        return Boolean(result.deletedCount);
    }
    async deleteOne(payload) {
        const result = await this.abstractModel.deleteOne(payload);
        return Boolean(result.deletedCount);
    }
    async deleteMany(payload) {
        const result = await this.abstractModel.deleteMany(payload);
        return Boolean(result.deletedCount);
    }
    async addToSet(id, arrayField, payload) {
        const result = await this.abstractModel.updateOne({ _id: id }, { $addToSet: { [arrayField]: payload } });
        return Boolean(result.modifiedCount);
    }
    async addToSetByFilter(filter, arrayField, payload) {
        const result = await this.abstractModel.updateMany(filter, { $addToSet: { [arrayField]: payload } }, { multi: true });
        return Boolean(result.modifiedCount);
    }
    async removeFromSet(id, arrayField, payload) {
        const result = await this.abstractModel.updateOne({ _id: id }, {
            $pull: { [arrayField]: payload },
        });
        return Boolean(result.modifiedCount);
    }
    async findManyByIds(ids, queryConfig) {
        return this.findMany({ _id: { $in: ids } }, queryConfig);
    }
    aggregateMany(pipelines, options) {
        return this.abstractModel.aggregate(pipelines, options).exec();
    }
    async aggregateOne(pipelines, options) {
        const result = await this.abstractModel
            .aggregate(pipelines, options)
            .exec();
        return result && result.length ? result[0] : null;
    }
    async aggregateTotal(pipelines, options) {
        const result = await this.abstractModel
            .aggregate(pipelines, options)
            .exec();
        return result && result.length ? result[0].total : 0;
    }
    async aggregateIds(pipelines, options) {
        const result = await this.abstractModel
            .aggregate(pipelines, options)
            .exec();
        return result && result.length ? result[0].ids : null;
    }
}
exports.AbstractService = AbstractService;
//# sourceMappingURL=abstract.service.js.map
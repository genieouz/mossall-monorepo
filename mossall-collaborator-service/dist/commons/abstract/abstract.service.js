"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
class AbstractService {
    constructor(model) {
        this.abstractModel = model;
    }
    insertOne(payload) {
        return this.abstractModel.create(payload);
    }
    insertMany(payload) {
        return this.abstractModel.insertMany(payload);
    }
    async findMany(queryFilter = {}, queryConfig) {
        const { limit, skip, orderBy } = (0, utils_1.normalizeQueryDataConfig)(queryConfig);
        return this.abstractModel.find(queryFilter).skip(skip).limit(limit).sort({ [orderBy.property]: orderBy.direction });
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
    async removeFromSet(id, arrayField, payload) {
        const result = await this.abstractModel.updateOne({ _id: id }, { $pull: { [arrayField]: payload } });
        return Boolean(result.modifiedCount);
    }
    async findManyByIds(ids, queryConfig) {
        return this.findMany({ _id: { $in: ids } }, queryConfig);
    }
    aggregateMany(pipelines, options) {
        return this.abstractModel.aggregate(pipelines, options).exec();
    }
    async aggregateOne(pipelines, options) {
        const result = await this.abstractModel.aggregate(pipelines, options).exec();
        return result && result.length ? result[0] : null;
    }
    async aggregateTotal(pipelines, options) {
        const result = await this.abstractModel.aggregate(pipelines, options).exec();
        return result && result.length ? result[0].total : 0;
    }
    async aggregateIds(pipelines, options) {
        const result = await this.abstractModel.aggregate(pipelines, options).exec();
        return result && result.length ? result[0].ids : null;
    }
}
exports.AbstractService = AbstractService;
//# sourceMappingURL=abstract.service.js.map
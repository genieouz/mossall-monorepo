import { NotFoundException } from "@nestjs/common";
import { AggregateOptions, Document, FilterQuery, Model, ObjectId, PipelineStage, UpdateQuery } from "mongoose";
import { QueryDataConfigInput } from "../graphql/query-data-config.input";
import { MongoId } from "../typings";
import { normalizeQueryDataConfig } from "../utils";

export abstract class AbstractService<T extends Document> {
    private abstractModel: Model<T>;
    protected constructor(model: Model<T>) {
        this.abstractModel = model;
    }

    insertOne(payload: T): Promise<T> {
        return this.abstractModel.create(payload);
    }

    insertMany(payload: T[]): Promise<T[]> {
        return this.abstractModel.insertMany(payload);
    }

    async findMany(queryFilter: FilterQuery<T> = {}, queryConfig?: QueryDataConfigInput): Promise<T[]> {
        const { limit, skip, orderBy } = normalizeQueryDataConfig(queryConfig);
        return this.abstractModel.find(queryFilter).skip(skip).limit(limit).sort({ [orderBy.property]: orderBy.direction });
    }

    async count(queryFilter: FilterQuery<T> = {}): Promise<number> {
        return this.abstractModel.countDocuments(queryFilter);
    }

    async findOneById(id: MongoId) {
        return this.abstractModel.findById(id);
    }

    async findOne(queryFilter: FilterQuery<T>) {
        return this.abstractModel.findOne(queryFilter);
    }

    async findOneOrFail(queryFilter: FilterQuery<T>) {
        const result = await this.findOne(queryFilter);
        if(!result) {
            throw new NotFoundException(`Aucun élément trouvé`);
        }
        return result;
    }

    async findOneByIdOrFail(id: MongoId) {
        const result = await this.findOneById(id);
        if(!result) {
            throw new NotFoundException(`L'élément n'existe pas`);
        }
        return result;
    }

    async findByIdAndUpdate(id: ObjectId | string, payload: UpdateQuery<T>) {
        const result = await this.abstractModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        if(!result) {
            throw new NotFoundException(`Not found`);
        }
        return result;
    }

    async findOneAndUpdate(queryFilter: FilterQuery<T>, payload: UpdateQuery<T>) {
        const result = await this.abstractModel.findOneAndUpdate(queryFilter, { $set: payload }, { new: true });
        if(!result) {
            throw new NotFoundException(`Not found`);
        }
        return result;
    }

    async updateOneById(id: MongoId, payload: UpdateQuery<T>) {
        const result = await this.abstractModel.updateOne({ _id: id }, { $set: payload });
        return Boolean(result.modifiedCount);
    }

    async updateOne(query: UpdateQuery<T>, payload: UpdateQuery<T>) {
        const result = await this.abstractModel.updateOne(query, { $set: payload });
        return Boolean(result.modifiedCount);
    }

    async deleteOneById(id: ObjectId | string) {
        const result = await this.abstractModel.deleteOne({ _id: id });
        return Boolean(result.deletedCount);
    }

    async deleteOne(payload: FilterQuery<T>) {
        const result = await this.abstractModel.deleteOne(payload);
        return Boolean(result.deletedCount);
    }

    async deleteMany(payload: FilterQuery<T>) {
        const result = await this.abstractModel.deleteMany(payload);
        return Boolean(result.deletedCount);
    }

    async addToSet<M>(id: ObjectId | string, arrayField: string, payload: any) {
        const result = await this.abstractModel.updateOne({ _id: id }, { $addToSet: { [arrayField]: payload } as any });
        return Boolean(result.modifiedCount);
    }

    async removeFromSet<M>(id: ObjectId | string, arrayField: string, payload: any) {
        const result = await this.abstractModel.updateOne({ _id: id }, { $pull: { [arrayField]: payload } } as any);
        return Boolean(result.modifiedCount);
    }

    async findManyByIds(ids: string[] | ObjectId[], queryConfig?: QueryDataConfigInput): Promise<T[]> {
        return this.findMany({ _id: { $in: ids } }, queryConfig);
    }

    aggregateMany<M>(pipelines: PipelineStage[], options?: AggregateOptions): Promise<M[]> {
        return this.abstractModel.aggregate<M>(pipelines, options).exec();
    }

    async aggregateOne<M>(pipelines: PipelineStage[], options?: AggregateOptions): Promise<M> {
        const result = await this.abstractModel.aggregate<M>(pipelines, options).exec();
        return result && result.length ? result[0] : null;
    }

    async aggregateTotal(pipelines: PipelineStage[], options?: AggregateOptions): Promise<number> {
        const result = await this.abstractModel.aggregate(pipelines, options).exec();
        return result && result.length ? result[0].total : 0;
    }

    async aggregateIds(pipelines: PipelineStage[], options?: AggregateOptions): Promise<ObjectId[]> {
        const result = await this.abstractModel.aggregate(pipelines, options).exec();
        return result && result.length ? result[0].ids : null;
    }

}

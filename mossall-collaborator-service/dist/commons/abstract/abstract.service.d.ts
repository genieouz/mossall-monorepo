/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { AggregateOptions, Document, FilterQuery, Model, ObjectId, PipelineStage, UpdateQuery } from "mongoose";
import { QueryDataConfigInput } from "../graphql/query-data-config.input";
import { MongoId } from "../typings";
export declare abstract class AbstractService<T extends Document> {
    private abstractModel;
    protected constructor(model: Model<T>);
    insertOne(payload: T): Promise<T>;
    insertMany(payload: T[]): Promise<T[]>;
    findMany(queryFilter?: FilterQuery<T>, queryConfig?: QueryDataConfigInput): Promise<T[]>;
    count(queryFilter?: FilterQuery<T>): Promise<number>;
    findOneById(id: MongoId): Promise<import("mongoose").HydratedDocument<T, {}, {}>>;
    findOne(queryFilter: FilterQuery<T>): Promise<import("mongoose").HydratedDocument<T, {}, {}>>;
    findOneOrFail(queryFilter: FilterQuery<T>): Promise<import("mongoose").HydratedDocument<T, {}, {}>>;
    findOneByIdOrFail(id: MongoId): Promise<import("mongoose").HydratedDocument<T, {}, {}>>;
    findByIdAndUpdate(id: ObjectId | string, payload: UpdateQuery<T>): Promise<import("mongoose").HydratedDocument<T, {}, {}>>;
    findOneAndUpdate(queryFilter: FilterQuery<T>, payload: UpdateQuery<T>): Promise<import("mongoose").HydratedDocument<T, {}, {}>>;
    updateOneById(id: MongoId, payload: UpdateQuery<T>): Promise<boolean>;
    updateOne(query: UpdateQuery<T>, payload: UpdateQuery<T>): Promise<boolean>;
    deleteOneById(id: ObjectId | string): Promise<boolean>;
    deleteOne(payload: FilterQuery<T>): Promise<boolean>;
    deleteMany(payload: FilterQuery<T>): Promise<boolean>;
    addToSet<M>(id: ObjectId | string, arrayField: string, payload: any): Promise<boolean>;
    removeFromSet<M>(id: ObjectId | string, arrayField: string, payload: any): Promise<boolean>;
    findManyByIds(ids: string[] | ObjectId[], queryConfig?: QueryDataConfigInput): Promise<T[]>;
    aggregateMany<M>(pipelines: PipelineStage[], options?: AggregateOptions): Promise<M[]>;
    aggregateOne<M>(pipelines: PipelineStage[], options?: AggregateOptions): Promise<M>;
    aggregateTotal(pipelines: PipelineStage[], options?: AggregateOptions): Promise<number>;
    aggregateIds(pipelines: PipelineStage[], options?: AggregateOptions): Promise<ObjectId[]>;
}

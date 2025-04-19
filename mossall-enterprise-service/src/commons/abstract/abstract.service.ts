import { NotFoundException } from '@nestjs/common';
import {
  AggregateOptions,
  Document,
  FilterQuery,
  Model,
  ObjectId,
  PipelineStage,
  UpdateQuery,
} from 'mongoose';
import { PaginationInfo } from '../graphql/pagination';
import { QueryDataConfigInput } from '../graphql/query-data-config.input';
import { defaultQueryLimit } from '../mongoose/constants';
import { MongoId } from '../typings';
import { diacriticSensitiveRegex, normalizeQueryDataConfig } from '../utils';
import { create } from 'domain';

interface ParsedSearchField {
  foreignCollection: string;
  localField: string;
  foreignField: string;
  searchableFields: Array<string | string[]>;
  additionalFields?: { field: string; type: 'string' | 'number' }[];
}

export abstract class AbstractService<T extends Document> {
  protected abstractModel: Model<T>;
  private searchFields: string[] = [];

  protected constructor(model: Model<T>, searchFields: string[] = []) {
    this.abstractModel = model;
    this.searchFields = searchFields;
  }

  private parseSearchField(field: string): {
    isComplex: boolean;
    parsed: ParsedSearchField | string;
  } {
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
                type: fieldType as 'string' | 'number',
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

  private createSearchCondition(
    field: string,
    search: string,
    type: 'string' | 'number' = 'string',
  ) {
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
      [field]: { $regex: diacriticSensitiveRegex(search), $options: 'i' },
    };
  }

  async findManyAndPaginate(
    queryFilter: FilterQuery<T> = {},
    queryConfig?: QueryDataConfigInput,
  ): Promise<{ results: T[]; pagination: PaginationInfo }> {
    const {
      limit,
      page = 1,
      orderBy,
      search,
    } = normalizeQueryDataConfig(queryConfig);

    const lookupStages: Set<PipelineStage> = new Set();
    const searchConditions = [];

    if (search && search.trim().length) {
      this.searchFields.forEach((field) => {
        const { isComplex, parsed } = this.parseSearchField(field);

        if (!isComplex) {
          const [fieldName, fieldType = 'string'] = field.split('|');
          searchConditions.push(
            this.createSearchCondition(
              fieldName,
              search,
              fieldType as 'string' | 'number',
            ),
          );
        } else {
          const parsedField = parsed as ParsedSearchField;

          // Add lookup stage
          lookupStages.add({
            $lookup: {
              from: parsedField.foreignCollection,
              localField: parsedField.localField,
              foreignField: parsedField.foreignField,
              as: `${parsedField.foreignCollection}_lookup`,
            },
          });

          // Add unwind stage to flatten the array
          lookupStages.add({
            $unwind: {
              path: `$${parsedField.foreignCollection}_lookup`,
              preserveNullAndEmptyArrays: true,
            },
          });

          // Add addFields stage for combined fields
          parsedField.searchableFields.forEach((field) => {
            if (Array.isArray(field)) {
              // For combined fields, add a new field that concatenates the values
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

              // Add search condition for the combined field
              searchConditions.push({
                [combinedFieldName]: {
                  $regex: diacriticSensitiveRegex(search),
                  $options: 'i',
                },
              });
            } else {
              // Single field search
              searchConditions.push({
                [`${parsedField.foreignCollection}_lookup.${field}`]: {
                  $regex: diacriticSensitiveRegex(search),
                  $options: 'i',
                },
              });
            }
          });

          // Add additional fields search conditions
          if (parsedField.additionalFields?.length) {
            parsedField.additionalFields.forEach(({ field, type }) => {
              searchConditions.push(
                this.createSearchCondition(field, search, type),
              );
            });
          }
        }
      });
    }

    const matchStage = {
      $match: {
        ...queryFilter,
        ...(searchConditions.length ? { $or: searchConditions } : {}),
      },
    };

    // Group back the results to remove duplicates from unwind
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

    const pagination: PaginationInfo = {
      totalItems,
      pageCount,
      currentPage,
      pageSize,
    };

    return { results, pagination };
  }

  insertOne(payload: T): Promise<T> {
    return this.abstractModel.create(payload);
  }

  insertMany(payload: T[]): Promise<T[]> {
    return this.abstractModel.insertMany(payload);
  }

  async findMany(
    queryFilter: FilterQuery<T> = {},
    queryConfig?: QueryDataConfigInput,
  ): Promise<T[]> {
    // const { limit, skip, orderBy } = normalizeQueryDataConfig(queryConfig);
    return this.abstractModel.find(queryFilter);
    // .skip(skip).limit(limit);
    // .sort({ [orderBy.property]: orderBy.direction })
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
    if (!result) {
      throw new NotFoundException(`Aucun élément trouvé`);
    }
    return result;
  }

  async findOneByIdOrFail(id: MongoId) {
    const result = await this.findOneById(id);
    if (!result) {
      throw new NotFoundException(`L'élément n'existe pas`);
    }
    return result;
  }

  async findByIdAndUpdate(id: ObjectId | string, payload: UpdateQuery<T>) {
    const result = await this.abstractModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
    if (!result) {
      throw new NotFoundException(`Not found`);
    }
    return result;
  }

  async findOneAndUpdate(queryFilter: FilterQuery<T>, payload: UpdateQuery<T>) {
    const result = await this.abstractModel.findOneAndUpdate(
      queryFilter,
      { $set: payload },
      { new: true },
    );
    if (!result) {
      throw new NotFoundException(`Not found`);
    }
    return result;
  }

  async updateOneById(id: MongoId, payload: UpdateQuery<T>) {
    const result = await this.abstractModel.updateOne(
      { _id: id },
      { $set: payload },
    );
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
    const result = await this.abstractModel.updateOne(
      { _id: id },
      { $addToSet: { [arrayField]: payload } as any },
    );
    return Boolean(result.modifiedCount);
  }

  async addToSetByFilter<M>(
    filter: FilterQuery<T>,
    arrayField: string,
    payload: any,
  ) {
    const result = await this.abstractModel.updateMany(
      filter,
      { $addToSet: { [arrayField]: payload } as any },
      { multi: true },
    );
    return Boolean(result.modifiedCount);
  }

  async removeFromSet<M>(
    id: ObjectId | string,
    arrayField: string,
    payload: any,
  ) {
    const result = await this.abstractModel.updateOne({ _id: id }, {
      $pull: { [arrayField]: payload },
    } as any);
    return Boolean(result.modifiedCount);
  }

  async findManyByIds(
    ids: string[] | ObjectId[],
    queryConfig?: QueryDataConfigInput,
  ): Promise<T[]> {
    return this.findMany({ _id: { $in: ids } }, queryConfig);
  }

  aggregateMany<M>(
    pipelines: PipelineStage[],
    options?: AggregateOptions,
  ): Promise<M[]> {
    return this.abstractModel.aggregate<M>(pipelines, options).exec();
  }

  async aggregateOne<M>(
    pipelines: PipelineStage[],
    options?: AggregateOptions,
  ): Promise<M> {
    const result = await this.abstractModel
      .aggregate<M>(pipelines, options)
      .exec();
    return result && result.length ? result[0] : null;
  }

  async aggregateTotal(
    pipelines: PipelineStage[],
    options?: AggregateOptions,
  ): Promise<number> {
    const result = await this.abstractModel
      .aggregate(pipelines, options)
      .exec();
    return result && result.length ? result[0].total : 0;
  }

  async aggregateIds(
    pipelines: PipelineStage[],
    options?: AggregateOptions,
  ): Promise<ObjectId[]> {
    const result = await this.abstractModel
      .aggregate(pipelines, options)
      .exec();
    return result && result.length ? result[0].ids : null;
  }
}

import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';

type ClassType<T = any> = new (...args: any[]) => T;

@ObjectType()
export class PaginationInfo {
  @Field(type => Int)
  @Directive('@shareable')
  totalItems: number;

  @Field(type => Int)
  @Directive('@shareable')
  pageCount: number;

  @Field(type => Int)
  @Directive('@shareable')
  currentPage: number;

  @Field(type => Int)
  @Directive('@shareable')
  pageSize: number;
}

export function PaginatedResult<TItem>(TItemClass: ClassType<TItem>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResultClass {
    @Field(type => PaginationInfo)
    @Directive('@shareable')
    pagination: PaginationInfo;

    @Field(type => [TItemClass])
    @Directive('@shareable')
    results: TItem[];
  }

  return PaginatedResultClass;
}

export interface IPagination<T> {
  results: T[];
  pagination: any;
}
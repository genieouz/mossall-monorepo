import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PaginatedResult } from '~/commons/graphql/pagination';
import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { Any } from '~/commons/graphql/scalars/any.scalar';

@ObjectType()
export class CategorySociopro extends Timestamps {
  @Field()
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Boolean, { nullable: true })
  activated: boolean;

  @Field({ nullable: true })
  organizationId: string;

  @Field({ nullable: true })
  addedBy?: string;
}

@ObjectType()
export class PaginatedCategorySocioproResult extends PaginatedResult(
  CategorySociopro,
) {}

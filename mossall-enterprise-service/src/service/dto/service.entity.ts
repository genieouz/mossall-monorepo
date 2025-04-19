import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PaginatedResult } from '~/commons/graphql/pagination';
import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { Any } from '~/commons/graphql/scalars/any.scalar';

@ObjectType()
export class Service extends Timestamps {
  @Field((type) => Any)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  identifier: string;

  @Field((type) => Int)
  refundDurationMonth: Number;

  @Field((type) => Boolean)
  available: boolean;

  @Field({ nullable: true })
  publishedAt: Date;

  @Field({ nullable: true })
  addedBy?: string;
}

@ObjectType()
export class PaginatedServiceResult extends PaginatedResult(Service) {}

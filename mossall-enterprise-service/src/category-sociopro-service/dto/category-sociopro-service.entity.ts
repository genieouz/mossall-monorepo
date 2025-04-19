import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PaginatedResult } from '~/commons/graphql/pagination';
import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { AmountUnit, DurationUnit } from '~/commons/enum';

@ObjectType()
export class CategorySocioproService extends Timestamps {
  @Field((type) => Any)
  id: string;

  @Field((type) => Int)
  amount: number;

  @Field((type) => AmountUnit)
  amountUnit: string;

  @Field((type) => Int)
  refundDuration: number;

  @Field((type) => DurationUnit)
  refundDurationUnit: string;

  @Field()
  activated: boolean;

  @Field((type) => Date, { nullable: true })
  activatedAt: Date;

  @Field((type) => Boolean)
  autoValidate: boolean;

  @Field()
  organisationServiceId: string;

  @Field()
  categorySocioproId: string;

  @Field({ nullable: true })
  eventId?: string;
}

@ObjectType()
export class PaginatedCategorySocioproServiceResult extends PaginatedResult(
  CategorySocioproService,
) {}

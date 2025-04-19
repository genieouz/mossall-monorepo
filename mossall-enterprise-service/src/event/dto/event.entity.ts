import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PaginatedResult } from '~/commons/graphql/pagination';
import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { AmountUnit, DurationUnit } from '~/commons/enum';

@ObjectType()
export class Event extends Timestamps {
  @Field((type) => Any)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Date)
  startDate: string;

  @Field((type) => Date)
  endDate: string;

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

  @Field({ nullable: true })
  addedBy?: string;
}

@ObjectType()
export class PaginatedEventResult extends PaginatedResult(Event) {}

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PaginatedResult } from '~/commons/graphql/pagination';
import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';

@ObjectType()
export class Event extends Timestamps {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Date)
  startDate: string;

  @Field((type) => Date)
  endDate: string;

  @Field((type) => Boolean, { nullable: true })
  activated: boolean;

  @Field({ nullable: true })
  addedBy?: string;
}

@ObjectType()
export class PaginatedEventResult extends PaginatedResult(Event) {}

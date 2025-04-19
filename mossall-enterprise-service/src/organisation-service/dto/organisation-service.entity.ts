import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PaginatedResult } from '~/commons/graphql/pagination';
import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { Any } from '~/commons/graphql/scalars/any.scalar';
import { AmountUnit, DurationUnit } from '~/commons/enum';

@ObjectType()
export class OrganisationService extends Timestamps {
  @Field((type) => Any)
  id: string;

  @Field((type) => Int, { nullable: true })
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

  @Field((type) => Int)
  activationDurationDay: number;

  @Field((type) => Boolean)
  autoValidate: boolean;

  @Field()
  organizationId: string;

  @Field()
  serviceId: string;
}

@ObjectType()
export class PaginatedOrganisationServiceResult extends PaginatedResult(
  OrganisationService,
) {}

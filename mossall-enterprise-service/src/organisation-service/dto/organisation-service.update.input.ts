import { Field, InputType, Int } from '@nestjs/graphql';
import { AmountUnit, DurationUnit } from '~/commons/enum';

@InputType()
export class OrganisationServiceUpdateInput {
  @Field((type) => Int, { nullable: true })
  amount: number;

  @Field((type) => AmountUnit, { nullable: true })
  amountUnit: string;

  @Field((type) => Int, { nullable: true })
  refundDuration: number;

  @Field((type) => DurationUnit, { nullable: true })
  refundDurationUnit: string;

  @Field({ nullable: true })
  activated: boolean;

  @Field((type) => Date, { nullable: true })
  activatedAt: Date;

  @Field((type) => Int, { nullable: true })
  activationDurationDay: number;

  @Field((type) => Boolean, { nullable: true })
  autoValidate: boolean;
}

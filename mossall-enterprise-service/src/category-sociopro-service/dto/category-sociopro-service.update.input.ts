import { Field, InputType, Int } from '@nestjs/graphql';
import { AmountUnit, DurationUnit } from '~/commons/enum';

@InputType()
export class CategorySocioproServiceUpdateInput {
  @Field((type) => Int, { nullable: true })
  amount: number;

  @Field((type) => AmountUnit, { nullable: true })
  amountUnit: string;

  @Field((type) => Int, { nullable: true })
  refundDuration: number;

  @Field((type) => DurationUnit, { nullable: true })
  refundDurationUnit: string;

  @Field((type) => Boolean, { nullable: true })
  activated: boolean;

  @Field((type) => Date, { nullable: true })
  activatedAt: Date;

  @Field((type) => Boolean, { nullable: true })
  autoValidate: boolean;
}

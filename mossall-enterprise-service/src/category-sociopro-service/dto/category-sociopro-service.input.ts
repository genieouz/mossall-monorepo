import { Field, InputType, Int } from '@nestjs/graphql';
import { AmountUnit, DurationUnit } from '~/commons/enum';

@InputType()
export class CategorySocioproServiceInput {
  @Field((type) => Int, { nullable: true })
  amount: number;

  @Field((type) => AmountUnit, { nullable: true })
  amountUnit: string;

  @Field((type) => Int)
  refundDuration: number;

  @Field((type) => DurationUnit, { nullable: true })
  refundDurationUnit: string;

  @Field((type) => Boolean)
  activated: boolean;

  @Field((type) => Date, { nullable: true })
  activatedAt: Date;

  @Field((type) => Boolean, { nullable: true })
  autoValidate: boolean;
}

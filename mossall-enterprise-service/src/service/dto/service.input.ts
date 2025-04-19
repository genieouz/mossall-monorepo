import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ServiceInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  identifier: string;

  @Field((type) => Int)
  refundDurationMonth: number;

  @Field((type) => Boolean)
  available: boolean;
}

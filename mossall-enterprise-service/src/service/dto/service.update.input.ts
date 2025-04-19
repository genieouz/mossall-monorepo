import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ServiceUpdateInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  identifier: string;

  @Field((type) => Boolean, { nullable: true })
  available: boolean;

  @Field({ nullable: true })
  refundDurationMonth: number;
}

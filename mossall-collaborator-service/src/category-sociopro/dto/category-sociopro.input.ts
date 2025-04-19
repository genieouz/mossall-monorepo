import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CategorySocioproInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Boolean, { nullable: true })
  activated: boolean;
}

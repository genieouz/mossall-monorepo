import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CategorySocioproUpdateInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Boolean, { nullable: true })
  activated: boolean;

  @Field({ nullable: true })
  activatedAt: Date;
}

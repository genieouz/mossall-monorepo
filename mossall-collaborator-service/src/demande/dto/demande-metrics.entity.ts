import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DemandeMetric {
  @Field({ nullable: true })
  year: number;

  @Field({ nullable: true })
  month: number;

  @Field()
  value: number;
}

@InputType()
export class DemandeMetricFilter {
  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}

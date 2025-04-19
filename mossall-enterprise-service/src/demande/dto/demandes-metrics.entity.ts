import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DemandesMetricsRow {
  @Field()
  date: string;

  @Field()
  amount: number;

  @Field()
  month: number;

  @Field()
  year: number;
}

@ObjectType()
export class DemandesMetrics {
  @Field((type) => [DemandesMetricsRow])
  payed: DemandesMetricsRow[];

  @Field((type) => [DemandesMetricsRow])
  total: DemandesMetricsRow[];

  @Field((type) => [DemandesMetricsRow])
  remaining: DemandesMetricsRow[];
}

@ObjectType()
export class DemandesTotalAmount {
  @Field((type) => Number)
  total: number;
}

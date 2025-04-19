import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DemandeMetric {
    @Field()
    year: number;

    @Field()
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

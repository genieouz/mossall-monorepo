import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DemandesMetricsInput {
    @Field()
    startDate: Date;

    @Field()
    endDate: Date;
}

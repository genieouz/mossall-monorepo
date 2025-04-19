import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CollaboratorsMetricsInput {
    @Field({ nullable: true, defaultValue: new Date("2023-01-01") })
    startDate: Date;

    @Field({ nullable: true, defaultValue: new Date("2030-12-31") })
    endDate: Date;

    @Field({ nullable: true, defaultValue: false })
    withCurrentDemande?: boolean;
}

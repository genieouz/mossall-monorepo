import { Field, InputType } from "@nestjs/graphql";
import { DemandeStatus } from "../enums/demande-status.enum";

@InputType()
export class DemandesMetricsInput {
    @Field({ nullable: true, defaultValue: new Date("2023-01-01") })
    startDate: Date;

    @Field({ nullable: true, defaultValue: new Date("2030-12-31") })
    endDate: Date;

    @Field({ nullable: true })
    minimum?: number;

    @Field({ nullable: true })
    maximum?: number;

    @Field(type => DemandeStatus, { nullable: true })
    status?: DemandeStatus;
}

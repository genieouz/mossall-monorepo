import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Timestamps } from "~/commons/graphql/types/timestamps/timestamps.entity";

@ObjectType()
export class Activity extends Timestamps {
    @Field(type => ID)
    id: string;
}

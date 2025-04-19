import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Timestamps } from "~/commons/graphql/types/timestamps/timestamps.entity";
import { DemandeStatus } from "../enums/demande-status.enum";

@ObjectType()
@Directive('@key(fields: "id")')
export class Demande extends Timestamps {
    @Field(type => ID)
    @Directive('@shareable')
    id: string;

    @Field()
    @Directive('@shareable')
    amount: number;

    @Field()
    @Directive('@shareable')
    number: number;

    @Field()
    @Directive('@shareable')
    fees: number;

    @Field(type => DemandeStatus)
    @Directive('@shareable')
    status: string;

    @Field({ nullable: true })
    rejectedReason: string;
}

import { Directive, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Timestamps {
    @Field()
    @Directive('@shareable')
    createdAt: Date;

    @Field()
    @Directive('@shareable')
    updatedAt: Date;
}

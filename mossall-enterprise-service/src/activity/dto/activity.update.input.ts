import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ActivityUpdateInput {
    @Field()
    id: string;
}

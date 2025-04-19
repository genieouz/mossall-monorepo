import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ActivityInput {
    @Field()
    id: string;
}

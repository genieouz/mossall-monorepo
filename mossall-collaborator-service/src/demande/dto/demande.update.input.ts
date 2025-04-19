import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DemandeUpdateInput {
    @Field()
    amount: number;
}

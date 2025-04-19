import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DemandeInput {
    @Field()
    amount: number;
}

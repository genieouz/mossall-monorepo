import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PaymentUpdateInput {
    @Field()
    id: string;
}

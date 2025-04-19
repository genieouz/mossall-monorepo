import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class FinalizeForgotPasswordInput {
    @Field()
    token: string;

    @Field()
    password: string;

    @Field()
    code: string;
}

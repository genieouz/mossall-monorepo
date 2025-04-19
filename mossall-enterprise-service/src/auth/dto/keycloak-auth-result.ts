import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class KeycloackAuthResult {
    @Field({ nullable: true, description: "Null if user must reset his password" })
    access_token: string;

    @Field({ nullable: true, description: "Null if user must reset his password" })
    expires_in: number;

    @Field({ nullable: true, description: "Null if user must reset his password" })
    refresh_expires_in: number;

    @Field({ nullable: true, description: "Null if user must reset his password" })
    refresh_token: string;

    @Field({ nullable: true, description: "Null if user must reset his password" })
    token_type: string;

    @Field({ nullable: true, description: "Null if user must reset his password" })
    session_state: string;

    @Field({ nullable: true, description: "Null if user must reset his password" })
    scope: string;
}

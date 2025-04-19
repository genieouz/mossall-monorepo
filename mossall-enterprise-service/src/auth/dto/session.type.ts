import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "~/users/dto/user.entity";
import { IUser } from "~/users/schemas/interfaces/user.interface";
import { KeycloackAuthResult } from "./keycloak-auth-result";

@ObjectType()
export class Session extends KeycloackAuthResult {
    @Field(type => User, { nullable: true, description: "Null if user must reset his password" })
    user: IUser;

    @Field({ nullable: true, description: "Not null if user must reset his password. Null other cases" })
    token: string;

    @Field({ description: "False if user must reset his password" })
    enabled: boolean;
}

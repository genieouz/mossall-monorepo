import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class OrganizationUpdateInput {
    @Field({ description: "Nom de l'organisation" })
    name: string;
}

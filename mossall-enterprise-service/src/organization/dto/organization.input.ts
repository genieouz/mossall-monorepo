import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationInput {
  @Field({ description: "Nom de l'organisation" })
  name: string;

  @Field({ description: "Email de l'utilisateur racine ou admin" })
  rootEmail: string;

  @Field({ description: "Prénom de l'utilisateur racine" })
  rootFirstname: string;

  @Field({ description: "Nom de l'utilisateur racine" })
  rootLastname: string;

  @Field()
  maxDemandeAmount: number;

  @Field()
  amountPercent: number;

  @Field()
  fees: number;
}

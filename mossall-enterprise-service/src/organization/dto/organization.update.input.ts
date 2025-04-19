import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationUpdateInput {
  @Field({ nullable: true, description: "Nom de l'organisation" })
  name: string;

  @Field({ nullable: true })
  maxDemandeAmount: number;

  @Field({ nullable: true })
  amountPercent: number;

  @Field({ nullable: true })
  fees: number;

  @Field({ nullable: true })
  demandeDeadlineDay: number;
}

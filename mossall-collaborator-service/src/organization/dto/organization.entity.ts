import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Organization {
  @Field((type) => ID)
  @Directive('@shareable')
  id: string;

  @Field({ description: "Nom de l'organisation" })
  @Directive('@shareable')
  name: string;

  @Field({ description: "Email de l'utilisateur racine ou admin" })
  @Directive('@shareable')
  rootEmail: string;

  @Field()
  maxDemandeAmount: number;

  @Field()
  amountPercent: number;

  @Field()
  fees: number;

  @Field()
  demandeDeadlineDay: number;
}

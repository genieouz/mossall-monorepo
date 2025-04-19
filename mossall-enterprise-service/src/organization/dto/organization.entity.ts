import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
@Directive('@key(fields: "id")')
export class Organization {
  @Field((type) => ID)
  @Directive('@shareable')
  @ApiProperty({ description: "Identifiant de l'organisation" })
  id: string;

  @Field({ description: "Nom de l'organisation" })
  @ApiProperty({ description: "Nom de l'organisation" })
  @Directive('@shareable')
  name: string;

  @Field({ description: "Email de l'utilisateur racine ou admin" })
  @ApiProperty({ description: "Email de l'utilisateur racine ou admin" })
  @Directive('@shareable')
  rootEmail: string;

  @ApiProperty({ description: "maximum demande de l'organization" })
  @Field()
  maxDemandeAmount: number;

  @ApiProperty({ description: "Pourcentage de l'organization" })
  @Field()
  amountPercent: number;

  @ApiProperty({ description: "Frais de l'organization" })
  @Field()
  fees: number;

  @ApiProperty({ description: 'Jour de deadline de la demande' })
  @Field({ nullable: true })
  demandeDeadlineDay?: number;
}

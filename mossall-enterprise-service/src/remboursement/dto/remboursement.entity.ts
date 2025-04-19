import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { RemboursementStatus } from '../enums/remboursement-status.enum';

@ObjectType()
@Directive('@key(fields: "id")')
export class Remboursement extends Timestamps {
  @Field((type) => ID)
  @Directive('@shareable')
  id: string;

  @Field()
  @Directive('@shareable')
  amount: number;

  @Field()
  @Directive('@shareable')
  number: number;

  @Field({ nullable: true })
  @Directive('@shareable')
  fees: number;

  @Field((type) => RemboursementStatus)
  @Directive('@shareable')
  status: string;

  @Field()
  @Directive('@shareable')
  demandeId: string;

  @Field({ nullable: true })
  @Directive('@shareable')
  userId: string;

  @Field({ nullable: true })
  @Directive('@shareable')
  validatedAt: Date;
}

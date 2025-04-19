import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { DemandeStatus } from '../enums/demande-status.enum';
import { User } from '~/users/dto/user.entity';
import { PaginatedResult } from '~/commons/graphql/pagination';

@ObjectType()
@Directive('@key(fields: "id")')
export class Demande extends Timestamps {
  @Field((type) => ID)
  @Directive('@shareable')
  id: string;

  @Field()
  @Directive('@shareable')
  amount: number;

  @Field()
  @Directive('@shareable')
  number: number;

  @Field()
  @Directive('@shareable')
  fees: number;

  @Field((type) => DemandeStatus)
  @Directive('@shareable')
  status: string;

  //field nullable

  @Field({ nullable: true })
  colloborator: User;

  @Field({ nullable: true })
  rejectedReason: string;
}

@ObjectType()
export class PaginatedDemandeResult extends PaginatedResult(Demande) {}

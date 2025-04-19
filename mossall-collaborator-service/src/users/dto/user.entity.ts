import { ObjectType, ID, Field, Directive, Float } from '@nestjs/graphql';
import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { Organization } from '~/organization/dto/organization.entity';
import { Wallet } from '../enums/wallet.enum';

@ObjectType()
export class User extends Timestamps {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field((type) => Organization)
  organization: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  position: string;

  @Field({ nullable: true })
  uniqueIdentifier: string;

  @Field((type) => Float, { nullable: true })
  salary?: number;

  @Field((type) => Float, { nullable: true })
  balance?: number;

  @Field({ nullable: true })
  wizallAccountNumber?: string;

  @Field({ nullable: true })
  bankAccountNumber?: string;
  @Field((type) => Float)
  totalDemandeAmount: number;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  blocked?: boolean;

  @Field({ nullable: true })
  birthDate: Date;

  @Field((type) => Wallet, { nullable: true })
  favoriteWallet: Wallet;

  @Field({ nullable: true })
  enableEmailNotification: boolean;
}

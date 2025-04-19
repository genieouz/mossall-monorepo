import { Field, InputType } from '@nestjs/graphql';
import { Wallet } from '~/payment/enums/wallet.enum';

@InputType()
export class UpdateMyAdminProfileInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  birthDate: Date;

  @Field((type) => Wallet, { nullable: true })
  favoriteWallet: Wallet;

  @Field({ nullable: true })
  enableEmailNotification: boolean;

  // @Field({ nullable: true })
  // @Directive('@shareable')
  // position: string;

  // @Field({ nullable: true })
  // @Directive('@shareable')
  // uniqueIdentifier: string;

  // @Field({ nullable: true })
  // @Directive('@shareable')
  // salary?: number;

  // @Field({ nullable: true })
  // @Directive('@shareable')
  // balance?: number;

  // @Field({ nullable: true })
  // @Directive('@shareable')
  // wizallAccountNumber?: string;

  // @Field({ nullable: true })
  // @Directive('@shareable')
  // bankAccountNumber?: string;
}

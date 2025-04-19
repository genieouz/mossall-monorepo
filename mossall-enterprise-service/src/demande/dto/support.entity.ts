import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SupportPaiement {
  //   @Field()
  //   id: string;
  @Field()
  amount: number;

  @Field()
  owner: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;

  @Field()
  uniqueIdentifier: string;
}

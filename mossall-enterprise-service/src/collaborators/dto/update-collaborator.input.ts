import { Field, InputType } from "@nestjs/graphql";
import { Wallet } from "~/payment/enums/wallet.enum";

@InputType()
export class UpdateCollaboratorInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    phoneNumber: string;

    @Field()
    address: string;

    @Field()
    position: string;

    @Field()
    uniqueIdentifier: string;

    @Field({ nullable: true })
    salary?: number;

    @Field({ nullable: true })
    wizallAccountNumber?: string;

    @Field({ nullable: true })
    bankAccountNumber?: string;

    @Field({ nullable: true })
    birthDate?: Date;

    @Field(type => Wallet, { nullable: true })
    favoriteWallet?: Wallet;
}

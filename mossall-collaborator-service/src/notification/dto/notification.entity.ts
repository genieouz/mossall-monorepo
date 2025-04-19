import { Field, ObjectType } from "@nestjs/graphql";
import { Timestamps } from "~/commons/graphql/types/timestamps/timestamps.entity";
import { User } from "~/users/dto/user.entity";
import { IUser } from "~/users/schemas/interfaces/user.interface";

@ObjectType()
export class Notification extends Timestamps {
    @Field({ nullable: true })
    entityId: string;
    
    @Field()
    title: string;

    @Field()
    content: string;

    @Field(type => User)
    by: IUser;
}

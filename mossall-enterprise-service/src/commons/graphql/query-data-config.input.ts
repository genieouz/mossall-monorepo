import { Field, InputType, Int } from "@nestjs/graphql";
import { OrderByDirection } from "./enums/order-by-direction.enum";
import { OrderByInput } from "./order-by.input";

@InputType()
export class QueryDataConfigInput {
    @Field(type => Int, { nullable: true })
    limit: number;

    @Field(type => Int, { nullable: true })
    page: number;

    @Field(type => OrderByInput, { nullable: true })
    orderBy: OrderByInput;

    @Field(type => String, { nullable: true })
    search: string;


}

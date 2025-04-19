import { Field, InputType } from "@nestjs/graphql";
import { OrderByDirection } from "./enums/order-by-direction.enum";

@InputType()
export class OrderByInput {
    @Field()
    property: string;

    @Field(type => OrderByDirection)
    direction: OrderByDirection;
}
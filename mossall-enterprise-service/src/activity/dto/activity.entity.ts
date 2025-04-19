import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PaginatedResult } from "~/commons/graphql/pagination";
import { Any } from "~/commons/graphql/scalars/any.scalar";
import { Timestamps } from "~/commons/graphql/types/timestamps/timestamps.entity";
import { Organization } from "~/organization/dto/organization.entity";
import { IOrganization } from "~/organization/schemas/interfaces/organization.interface";
import { User } from "~/users/dto/user.entity";
import { IUser } from "~/users/schemas/interfaces/user.interface";
import { ActivityScope } from "../enums/activity-scope.enum";

@ObjectType()
export class Activity extends Timestamps {
    @Field(type => ID)
    id: string;

    @Field()
    message: string;

    @Field(type => Any, { nullable: true })
    initialValue?: any;

    @Field(type => Any, { nullable: true })
    currentValue?: any;

    @Field(type => Any, { nullable: true })
    meta?: any;

    @Field(type => User)
    user: IUser;

    @Field(type => ActivityScope)
    scope: ActivityScope;

    @Field(type => Organization)
    organization: IOrganization;
}

@ObjectType()
export class PaginatedActivityResult extends PaginatedResult(Activity) {}

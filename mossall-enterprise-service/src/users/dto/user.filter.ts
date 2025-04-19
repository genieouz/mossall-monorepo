import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '../enums/user-role.enum';

@InputType()
export class UserFilterInput {
  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field((type) => UserRole, { nullable: true })
  role?: UserRole;
}

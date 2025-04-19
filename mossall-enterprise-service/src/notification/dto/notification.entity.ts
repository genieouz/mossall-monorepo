import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResult } from '~/commons/graphql/pagination';
import { Timestamps } from '~/commons/graphql/types/timestamps/timestamps.entity';
import { User } from '~/users/dto/user.entity';
import { IUser } from '~/users/schemas/interfaces/user.interface';

@ObjectType()
export class Notification extends Timestamps {
  @ApiProperty({ type: String, description: 'entity id' })
  @Field({ nullable: true })
  entityId: string;

  @ApiProperty({ type: String, description: 'notification title' })
  @Field()
  title: string;

  @ApiProperty({ type: String, description: 'notification content' })
  @Field()
  content: string;

  @ApiProperty({ type: String, description: 'notification author' })
  @Field((type) => User)
  author: IUser;

  @ApiProperty({ type: String, description: 'notification organization' })
  @Field()
  organization: string;

  @ApiProperty({ type: Boolean, description: 'notification viewed by me' })
  @Field()
  viewedByMe: boolean;
}

@ObjectType()
export class PaginatedNotificationResult extends PaginatedResult(
  Notification,
) {}

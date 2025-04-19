import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Session } from './dto/session.type';
import * as jwt from 'jsonwebtoken';
import { UserService } from '~/users/user.service';
import { User } from '~/users/dto/user.entity';

@Resolver((of) => Session)
export class SessionPropertyResolver {
  constructor(private userService: UserService) {}

  @ResolveField((returns) => User)
  user(@Parent() session: Session) {
    const decodedToken = jwt.decode(session.access_token);
    if (!decodedToken) {
      return null;
    }
    return this.userService.findOne({ email: decodedToken.email });
  }
}

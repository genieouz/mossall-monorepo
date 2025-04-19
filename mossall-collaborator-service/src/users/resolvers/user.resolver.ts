import { UseGuards } from '@nestjs/common';
import {
  Args,
  Float,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { DemandeService } from '~/demande/services/demande.service';
import { User } from '../dto/user.entity';
import { IUser } from '../schemas/interfaces/user.interface';
import { UserService } from '../user.service';
import { AuthGuard } from '~/auth/auth.guard';
import { AuthService } from '~/auth/auth.service';

@UseGuards(AuthGuard)
@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Query((returns) => String, {
    description: 'Token to call reset password endpoint',
  })
  async requestResetCollaboratorPassword(
    @Args({ name: 'oldPassword', type: () => String }) oldPassword: string,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.authService.requestResetPassword({
      email: currentUser.email,
      password: oldPassword,
    });
  }
}

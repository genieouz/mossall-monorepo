import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { Session } from './dto/session.type';
import { ResetPasswordInput } from './dto/reset-password.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => Session)
  async loginCollaborator(
    @Args({ name: 'loginInput', type: () => LoginInput })
    loginInput: LoginInput,
  ) {
    return this.authService.loginJWT(loginInput);
  }

  @Mutation((returns) => Boolean)
  async resetCollaboratorPassword(
    @Args({ name: 'resetPasswordInput', type: () => ResetPasswordInput })
    resetPassword: ResetPasswordInput,
  ): Promise<boolean> {
    return this.authService.resetPassword(resetPassword);
  }
  @Mutation((returns) => Boolean)
  async startForgotPassword(
    @Args({ name: 'email', type: () => String }) email: string,
  ): Promise<boolean> {
    return this.authService.startForgotPassword(email);
  }

  @Query((returns) => Session)
  async refreshCollaboratorToken(
    @Args({ name: 'refreshToken', type: () => String })
    refreshToken: string,
  ) {
    return this.authService.refreshToken(refreshToken);
  }
}

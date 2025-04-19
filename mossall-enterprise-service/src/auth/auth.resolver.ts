import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  KEYCLOAK_COLLABORATOR_CLIENT_ID,
  KEYCLOAK_COLLABORATOR_CLIENT_SECRET,
  KEYCLOAK_COLLABORATOR_REALM,
  KEYCLOAK_ENTERPRISE_CLIENT_ID,
  KEYCLOAK_ENTERPRISE_CLIENT_SECRET,
  KEYCLOAK_ENTERPRISE_REALM,
  KEYCLOAK_MASTER_CLIENT_ID,
  KEYCLOAK_MASTER_CLIENT_SECRET,
} from '~/config/env';
import { AuthService } from './auth.service';
import { FinalizeForgotPasswordInput } from './dto/finalize-forgot-password.input';
import { KeycloackAuthResult } from './dto/keycloak-auth-result';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { Session } from './dto/session.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => Session)
  async loginAdmin(
    @Args({ name: 'loginInput', type: () => LoginInput })
    loginInput: LoginInput,
  ) {
    // return this.authService.login(
    //   loginInput,
    //   KEYCLOAK_ENTERPRISE_REALM,
    //   KEYCLOAK_ENTERPRISE_CLIENT_ID,
    //   KEYCLOAK_ENTERPRISE_CLIENT_SECRET,
    // );
    return this.authService.loginJWT(loginInput);
    // return this.authService.login(loginInput, KEYCLOAK_ENTERPRISE_REALM, "mossall_admin_web_public" , null);
  }

  @Mutation((returns) => Boolean)
  async resetAdminPassword(
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

  @Mutation((returns) => Boolean)
  async finalizeForgotPassword(
    @Args({
      name: 'finalizeForgotPasswordInput',
      type: () => FinalizeForgotPasswordInput,
    })
    payload: FinalizeForgotPasswordInput,
  ): Promise<boolean> {
    // return this.authService.finalizeForgotPassword(payload);
    return false;
  }
}

import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { KEYCLOAK_COLLABORATOR_CLIENT_ID, KEYCLOAK_COLLABORATOR_CLIENT_SECRET, KEYCLOAK_COLLABORATOR_REALM, KEYCLOAK_ENTERPRISE_CLIENT_ID, KEYCLOAK_ENTERPRISE_CLIENT_SECRET, KEYCLOAK_ENTERPRISE_REALM, KEYCLOAK_MASTER_CLIENT_ID, KEYCLOAK_MASTER_CLIENT_SECRET, KEYCLOAK_MASTER_REALM, KEYCLOAK_URL } from '~/config/env';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: KEYCLOAK_URL, 
      realm: KEYCLOAK_COLLABORATOR_REALM,
      secret: KEYCLOAK_COLLABORATOR_CLIENT_SECRET,
      clientId: KEYCLOAK_COLLABORATOR_CLIENT_ID,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  } 
}

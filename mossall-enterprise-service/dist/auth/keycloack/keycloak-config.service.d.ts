import { KeycloakConnectOptions, KeycloakConnectOptionsFactory } from 'nest-keycloak-connect';
export declare class KeycloakConfigService implements KeycloakConnectOptionsFactory {
    createKeycloakConnectOptions(): KeycloakConnectOptions;
}

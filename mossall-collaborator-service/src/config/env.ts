import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URL = process.env.MONGODB_URL;
export const ENABLE_PLAYGROUND = Boolean(process.env.ENABLE_PLAYGROUND);
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_LOGIN_TOKEN_DURATION = process.env.JWT_LOGIN_TOKEN_DURATION;

export const KEYCLOAK_ENTERPRISE_REALM = process.env.KEYCLOAK_ENTERPRISE_REALM;
export const KEYCLOAK_ENTERPRISE_CLIENT_ID =
  process.env.KEYCLOAK_ENTERPRISE_CLIENT_ID;
export const KEYCLOAK_ENTERPRISE_CLIENT_SECRET =
  process.env.KEYCLOAK_ENTERPRISE_CLIENT_SECRET;
export const KEYCLOAK_COLLABORATOR_REALM =
  process.env.KEYCLOAK_COLLABORATOR_REALM;
export const KEYCLOAK_COLLABORATOR_CLIENT_ID =
  process.env.KEYCLOAK_COLLABORATOR_CLIENT_ID;
export const KEYCLOAK_COLLABORATOR_CLIENT_SECRET =
  process.env.KEYCLOAK_COLLABORATOR_CLIENT_SECRET;

export const KEYCLOAK_MASTER_REALM = process.env.KEYCLOAK_MASTER_REALM;
export const KEYCLOAK_MASTER_CLIENT_SECRET =
  process.env.KEYCLOAK_MASTER_CLIENT_SECRET;
export const KEYCLOAK_MASTER_CLIENT_ID = process.env.KEYCLOAK_MASTER_CLIENT_ID;
export const KEYCLOAK_MASTER_USERNAME = process.env.KEYCLOAK_MASTER_USERNAME;
export const KEYCLOAK_MASTER_PASSWORD = process.env.KEYCLOAK_MASTER_PASSWORD;

export const SENDINBLUE_API_KEY = process.env.SENDINBLUE_API_KEY;
export const ADMIN_FRONT_URL = process.env.ADMIN_FRONT_URL;

export const KEYCLOAK_URL = process.env.KEYCLOAK_URL;
export const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
export const ENTERPRISE_SERVICE = process.env.ENTERPRISE_SERVICE;
export const ENTERPRISE_SERVICE_API_KEY =
  process.env.ENTERPRISE_SERVICE_API_KEY;

export const IS_ONLINE = process.env.IS_ONLINE;

export const ALAL_API_KEY = process.env.ALAL_API_KEY;
export const ALAL_API_URL = process.env.ALAL_API_URL;

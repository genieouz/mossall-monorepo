import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const resetPasswordTokenDuration = 60 * 60; // 1heure
export const accessTokenDuration = 60 * 60 * 24 * 7; // 7 jours
export const TOKEN_NAME = 'access-token';
export const AUTH_OPTIONS: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'Bearer',
};

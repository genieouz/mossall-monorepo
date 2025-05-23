import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { QueryDataConfigInput } from "./graphql/query-data-config.input";

export function getRequestFromContext(context: ExecutionContext) {
    return context.switchToHttp().getRequest() || GqlExecutionContext.create(context).getContext().req;
}

export function normalizeQueryDataConfig(queryDataConfig: QueryDataConfigInput): QueryDataConfigInput {
    if(!queryDataConfig) {
        queryDataConfig  = {} as QueryDataConfigInput;
    }
    if(queryDataConfig.limit <= 0) {
        queryDataConfig.limit = 100;
    }
    if(queryDataConfig.skip < 0) {
        queryDataConfig.skip = 0;
    }
    if(!queryDataConfig.orderBy) {
        queryDataConfig.orderBy = {
            direction: -1,
            property: 'updatedAt'
        }
    }
    return queryDataConfig;
}

export function generatePassword(length = 8, options = { numbers: true, uppercase: true, symbols: true }) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*_+-=|;:,.<>/?';
    
    let chars = lowercaseChars;
    let password = '';

    // Garantir au moins un caractère de chaque type sélectionné
    if (options.numbers) {
        chars += numberChars;
        password += numberChars[Math.floor(Math.random() * numberChars.length)];
    }
    if (options.uppercase) {
        chars += uppercaseChars;
        password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    }
    if (options.symbols) {
        chars += symbolChars;
        password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }

    // Remplir le reste du mot de passe avec des caractères aléatoires
    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    
    // Mélanger le mot de passe pour ne pas avoir les caractères imposés au début
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}


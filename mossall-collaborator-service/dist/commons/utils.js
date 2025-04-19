"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = exports.normalizeQueryDataConfig = exports.getRequestFromContext = void 0;
const graphql_1 = require("@nestjs/graphql");
function getRequestFromContext(context) {
    return context.switchToHttp().getRequest() || graphql_1.GqlExecutionContext.create(context).getContext().req;
}
exports.getRequestFromContext = getRequestFromContext;
function normalizeQueryDataConfig(queryDataConfig) {
    if (!queryDataConfig) {
        queryDataConfig = {};
    }
    if (queryDataConfig.limit <= 0) {
        queryDataConfig.limit = 100;
    }
    if (queryDataConfig.skip < 0) {
        queryDataConfig.skip = 0;
    }
    if (!queryDataConfig.orderBy) {
        queryDataConfig.orderBy = {
            direction: -1,
            property: 'updatedAt'
        };
    }
    return queryDataConfig;
}
exports.normalizeQueryDataConfig = normalizeQueryDataConfig;
function generatePassword(length = 8, options = { numbers: true, uppercase: true, symbols: true }) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*_+-=|;:,.<>/?';
    let chars = lowercaseChars;
    let password = '';
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
    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    return password;
}
exports.generatePassword = generatePassword;
//# sourceMappingURL=utils.js.map
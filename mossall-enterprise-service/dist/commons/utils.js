"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diacriticSensitiveRegex = exports.generatePassword = exports.normalizeQueryDataConfig = exports.getRequestFromContext = void 0;
const graphql_1 = require("@nestjs/graphql");
const constants_1 = require("./mongoose/constants");
function getRequestFromContext(context) {
    return (context.switchToHttp().getRequest() ||
        graphql_1.GqlExecutionContext.create(context).getContext().req);
}
exports.getRequestFromContext = getRequestFromContext;
function normalizeQueryDataConfig(queryDataConfig) {
    console.log(queryDataConfig);
    if (!queryDataConfig) {
        queryDataConfig = {};
    }
    if (queryDataConfig.limit <= 0 || !queryDataConfig.limit) {
        queryDataConfig.limit = constants_1.defaultQueryLimit;
    }
    if (queryDataConfig.page < 1 || !queryDataConfig.page) {
        queryDataConfig.page = 1;
    }
    if (!queryDataConfig.orderBy) {
        queryDataConfig.orderBy = {
            direction: -1,
            property: 'updatedAt',
        };
    }
    else {
        queryDataConfig.orderBy = {
            direction: queryDataConfig.orderBy.direction,
            property: queryDataConfig.orderBy.property,
        };
    }
    if (queryDataConfig.search) {
        queryDataConfig.search = queryDataConfig.search.trim();
    }
    else {
        queryDataConfig.search = '';
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
        password +=
            uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    }
    if (options.symbols) {
        chars += symbolChars;
        password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }
    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    password = password
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');
    return password;
}
exports.generatePassword = generatePassword;
function diacriticSensitiveRegex(string = '') {
    return string
        .replace(/a/g, '[a,á,à,ä,â]')
        .replace(/A/g, '[A,a,á,à,ä,â]')
        .replace(/e/g, '[e,é,ë,è]')
        .replace(/E/g, '[E,e,é,ë,è]')
        .replace(/i/g, '[i,í,ï,ì]')
        .replace(/I/g, '[I,i,í,ï,ì]')
        .replace(/o/g, '[o,ó,ö,ò]')
        .replace(/O/g, '[O,o,ó,ö,ò]')
        .replace(/u/g, '[u,ü,ú,ù]')
        .replace(/U/g, '[U,u,ü,ú,ù]')
        .replace(/\+/g, '\\+');
}
exports.diacriticSensitiveRegex = diacriticSensitiveRegex;
//# sourceMappingURL=utils.js.map
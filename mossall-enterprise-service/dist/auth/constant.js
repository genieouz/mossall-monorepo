"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_OPTIONS = exports.TOKEN_NAME = exports.accessTokenDuration = exports.resetPasswordTokenDuration = void 0;
exports.resetPasswordTokenDuration = 60 * 60;
exports.accessTokenDuration = 60 * 60 * 24 * 7;
exports.TOKEN_NAME = 'access-token';
exports.AUTH_OPTIONS = {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'Bearer',
};
//# sourceMappingURL=constant.js.map
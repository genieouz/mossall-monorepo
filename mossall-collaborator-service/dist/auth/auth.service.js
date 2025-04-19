"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AuthService_logger;
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../users/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const constant_1 = require("./constant");
const env_1 = require("../config/env");
const utils_1 = require("../commons/utils");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_role_enum_1 = require("../users/enums/user-role.enum");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, eventEmitter) {
        this.userService = userService;
        this.eventEmitter = eventEmitter;
        _AuthService_logger.set(this, void 0);
        __classPrivateFieldSet(this, _AuthService_logger, new common_1.Logger(`🛡️🛡️${AuthService_1.name}🛡️🛡️🛡️`), "f");
    }
    async loginJWT(payload) {
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('Login user with payload ' + JSON.stringify(payload));
        let user = await this.userService.findOne({
            email: payload.email.split(' ').join(''),
            blocked: { $ne: true },
        });
        if (!user || user.role !== user_role_enum_1.UserRole.COLLABORATOR) {
            __classPrivateFieldGet(this, _AuthService_logger, "f").log('user not found');
            __classPrivateFieldGet(this, _AuthService_logger, "f").log(user);
            throw new common_1.UnauthorizedException();
        }
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('user found ' + user.email);
        if (!bcrypt.compareSync(payload.password, user.password)) {
            __classPrivateFieldGet(this, _AuthService_logger, "f").log('user password not matching');
            throw new common_1.UnauthorizedException();
        }
        delete user.password;
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('user password checked');
        const encryptedData = {
            user: {
                _id: user._id,
                email: user.email,
            },
        };
        if (!(user === null || user === void 0 ? void 0 : user.enabled)) {
            __classPrivateFieldGet(this, _AuthService_logger, "f").log('user not enabled');
            const token = jwt.sign(encryptedData, env_1.JWT_SECRET, {
                expiresIn: constant_1.resetPasswordTokenDuration,
            });
            return { enabled: false, user: null, token };
        }
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('user enabled');
        const accessToken = jwt.sign(encryptedData, env_1.JWT_SECRET, {
            expiresIn: constant_1.accessTokenDuration,
        });
        console.log(JSON.stringify(await this.decodeToken(accessToken, env_1.JWT_SECRET)));
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('user access token generated');
        const refreshToken = jwt.sign(encryptedData, env_1.JWT_SECRET, {
            expiresIn: constant_1.resetPasswordTokenDuration,
        });
        console.log(JSON.stringify(await this.decodeToken(refreshToken, env_1.JWT_SECRET)));
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('user refresh token generated');
        return {
            user,
            enabled: true,
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: constant_1.resetPasswordTokenDuration,
        };
    }
    async decodeToken(token, secret = env_1.JWT_SECRET) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, result) => {
                if (err) {
                    resolve(null);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async refreshToken(token) {
        try {
            __classPrivateFieldGet(this, _AuthService_logger, "f").log('refreshing token with token ' + token);
            __classPrivateFieldGet(this, _AuthService_logger, "f").log('decode token with payload ' + token);
            const decoded = jwt.verify(token, env_1.JWT_SECRET);
            __classPrivateFieldGet(this, _AuthService_logger, "f").log(`info in token ${JSON.stringify(decoded)}`);
            if (!decoded) {
                throw new common_1.NotFoundException('Jeton invalide');
            }
            __classPrivateFieldGet(this, _AuthService_logger, "f").log('token decode success with token ' + token);
            const userOnDb = await this.userService.findOne({
                email: decoded.user.email,
            });
            if (!userOnDb) {
                throw new common_1.NotFoundException('Jeton invalide');
            }
            __classPrivateFieldGet(this, _AuthService_logger, "f").log('user found ' + userOnDb.email);
            const newAccessToken = jwt.sign({ user: { _id: userOnDb._id, email: userOnDb.email } }, env_1.JWT_SECRET, {
                expiresIn: constant_1.accessTokenDuration,
            });
            __classPrivateFieldGet(this, _AuthService_logger, "f").log('user access token generated');
            const newRefreshToken = jwt.sign({ user: { _id: userOnDb._id, email: userOnDb.email } }, env_1.JWT_SECRET, {
                expiresIn: constant_1.resetPasswordTokenDuration,
            });
            __classPrivateFieldGet(this, _AuthService_logger, "f").log('user refresh token generated');
            return {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                expires_in: constant_1.resetPasswordTokenDuration,
            };
        }
        catch (error) {
            __classPrivateFieldGet(this, _AuthService_logger, "f").error(error);
            throw new common_1.NotFoundException('Jeton de rafraîchissement invalide');
        }
    }
    async startForgotPassword(email) {
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('startForgotPassword with email ' + email);
        const user = await this.userService.findOne({ email });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('user found ' + user.email);
        const password = (0, utils_1.generatePassword)();
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('password generated ' + password);
        await this.userService.updateOneById(user._id, {
            password: bcrypt.hashSync(password, 10),
            enabled: false,
        });
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('user updated ' + user.email);
        this.eventEmitter.emit('startforgotpassword', { email, password });
        return true;
    }
    async requestResetPassword(payload) {
        const user = await this.userService.findOneOrFail({ email: payload.email });
        const same = bcrypt.compareSync(payload.password, user.password);
        if (!same) {
            throw new common_1.ForbiddenException('Mot de passe incorrecte');
        }
        delete payload.password;
        const token = jwt.sign({ user: payload }, env_1.JWT_SECRET, {
            expiresIn: constant_1.resetPasswordTokenDuration,
        });
        return token;
    }
    async resetPassword(resetInput) {
        var _a;
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('resetPassword with payload ' + JSON.stringify(resetInput));
        const tempUser = await this.decodeToken(resetInput.token, env_1.JWT_SECRET);
        __classPrivateFieldGet(this, _AuthService_logger, "f").log(`info in token ${JSON.stringify(tempUser)}`);
        if (!tempUser || !tempUser.user) {
            __classPrivateFieldGet(this, _AuthService_logger, "f").log('token decode failed with token ' + resetInput.token);
            throw new common_1.BadRequestException(`Token invalide`);
        }
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('token decode success with token ' + resetInput.token);
        const user = await this.userService.findOne({
            email: (_a = tempUser.user) === null || _a === void 0 ? void 0 : _a.email,
        });
        if (!user) {
            __classPrivateFieldGet(this, _AuthService_logger, "f").log('user not found with token ' + resetInput.token);
            throw new common_1.BadRequestException(`Cet utilisateur n'existe pas`);
        }
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('user found with token ' + user);
        user.password = bcrypt.hashSync(resetInput.password, 10);
        user.enabled = true;
        __classPrivateFieldGet(this, _AuthService_logger, "f").log('user updating with token ' + user.email);
        return this.userService.updateOneById(user._id, user);
    }
};
_AuthService_logger = new WeakMap();
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        event_emitter_1.EventEmitter2])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
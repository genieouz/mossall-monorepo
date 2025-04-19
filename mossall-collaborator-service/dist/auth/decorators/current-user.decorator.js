"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../commons/utils");
exports.CurrentUser = (0, common_1.createParamDecorator)((pick, context) => {
    const req = (0, utils_1.getRequestFromContext)(context);
    return pick ? req.user[pick] : req.user;
});
//# sourceMappingURL=current-user.decorator.js.map
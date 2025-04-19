"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentOrganization = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../commons/utils");
exports.CurrentOrganization = (0, common_1.createParamDecorator)((pick, context) => {
    const req = (0, utils_1.getRequestFromContext)(context);
    const data = req.organization;
    return pick ? data[pick] : data;
});
//# sourceMappingURL=current-organization.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollabApi = exports.IS_COLLAB_API = void 0;
const common_1 = require("@nestjs/common");
exports.IS_COLLAB_API = 'isCollabApi';
const CollabApi = () => (0, common_1.SetMetadata)(exports.IS_COLLAB_API, true);
exports.CollabApi = CollabApi;
//# sourceMappingURL=collab-api.decorator.js.map
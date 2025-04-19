"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const constant_1 = require("../auth/constant");
const title = 'MOSSALL Enterprise API';
const description = 'This is the API of the MOSSALL Enterprise. ';
const SwaggerConfig = (app, apiVersion) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .addBearerAuth(constant_1.AUTH_OPTIONS, constant_1.TOKEN_NAME)
        .setVersion(apiVersion)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    console.log(`v${apiVersion}/swagger`);
    swagger_1.SwaggerModule.setup(`v${apiVersion}/swagger`, app, document);
};
exports.SwaggerConfig = SwaggerConfig;
//# sourceMappingURL=swagger.config.js.map
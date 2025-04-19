"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const env_1 = require("./config/env");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: '*',
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204
    });
    await app.listen(env_1.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map
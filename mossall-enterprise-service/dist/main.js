"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const env_1 = require("./config/env");
const graphql_upload_ts_1 = require("graphql-upload-ts");
const common_1 = require("@nestjs/common");
const gradient_string_1 = require("gradient-string");
const figlet_1 = require("figlet");
const swagger_config_1 = require("./config/swagger.config");
async function bootstrap() {
    await welcome();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: '*',
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.use('/graphql', (0, graphql_upload_ts_1.graphqlUploadExpress)({ maxFileSize: 10000000, maxFiles: 10 }));
    app.useGlobalPipes(new common_1.ValidationPipe());
    (0, swagger_config_1.SwaggerConfig)(app, '1');
    await app.listen(env_1.PORT);
}
function welcome() {
    console.log((0, gradient_string_1.fruit)('WELCOME TO MOSSAL-ENTR-SERVICE.\nBootstraping Pre-Start Routines...\n'));
    (0, figlet_1.text)(`MOSSAL_ENT_SERVICE`, (err, data) => {
        console.log(gradient_string_1.pastel.multiline(data) + '\n');
    });
    return () => new Promise((r) => setTimeout(r, 100));
}
bootstrap();
//# sourceMappingURL=main.js.map
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/env';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { ValidationPipe } from '@nestjs/common';
import { fruit, pastel } from 'gradient-string';
import { text } from 'figlet';
import { SwaggerConfig } from './config/swagger.config';

async function bootstrap() {
  await welcome();

  const app = await NestFactory.create(AppModule);
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  app.enableCors({
    origin: '*', // Autoriser toutes les origines
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Autoriser toutes les méthodes
    allowedHeaders: '*', // Autoriser tous les headers
    credentials: true, // Autoriser les cookies en cross-origin
    preflightContinue: false,
    optionsSuccessStatus: 204, // Statut de succès pour les requêtes OPTIONS
  });

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  );
  app.useGlobalPipes(new ValidationPipe());
  SwaggerConfig(app, '1');

  await app.listen(PORT);
}

function welcome() {
  console.log(
    fruit(
      'WELCOME TO MOSSAL-ENTR-SERVICE.\nBootstraping Pre-Start Routines...\n',
    ),
  );

  text(`MOSSAL_ENT_SERVICE`, (err: any, data: any) => {
    console.log(pastel.multiline(data) + '\n');
  });
  return () => new Promise((r) => setTimeout(r, 100));
}
bootstrap();

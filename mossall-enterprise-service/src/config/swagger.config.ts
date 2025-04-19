import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AUTH_OPTIONS, TOKEN_NAME } from '~/auth/constant';

const title = 'MOSSALL Enterprise API';
const description = 'This is the API of the MOSSALL Enterprise. ';

export const SwaggerConfig = (app: INestApplication, apiVersion: string) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .setVersion(apiVersion)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup(`v${apiVersion}/swagger`, app, document);
  console.log(`v${apiVersion}/swagger`);
  SwaggerModule.setup(`v${apiVersion}/swagger`, app, document);
};

import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Devteam Starter APP - API')
    .setDescription('Um aplicativo inicial para desenvolvimento de API')
    .setVersion('1.0.0')
    .setContact(
      'Devteam',
      'https://www.devteam.com.br',
      'contato@devteam.com.br'
    )
    .addTag('Auth')
    .addTag('Localidades')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const docPath = '/api/v1/docs';
  const swaggerCustomOptions: SwaggerCustomOptions = {
    customSiteTitle: `Devteam Starter App API - Swagger UI`,
  };

  SwaggerModule.setup(docPath, app, document, swaggerCustomOptions);
}

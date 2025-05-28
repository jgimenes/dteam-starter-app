import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Initialize Helmet for security headers
  app.use(helmet());

  //* Enable CORS for all origins
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  //* Set global prefix for API routes

  const prefix = process.env.APPLICATION_PREFIX ?? '';
  const versionPath = process.env.APPLICATION_VERSION_PATH ?? '';
  const globalPrefix = prefix + versionPath || 'api';

  app.setGlobalPrefix(globalPrefix);

  //* Set OpenAPI documentation options

  setupSwagger(app);

  await app.listen(process.env.APPLICATION_PORT ?? 3000);
}
void bootstrap();

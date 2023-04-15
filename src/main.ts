import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const APP = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const PORT = process.env.PORT || 5000;
  const CONFIG = new DocumentBuilder()
    .setTitle('Rubicon')
    .setDescription('REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('RBC')
    .build();
  const DOCUMENT = SwaggerModule.createDocument(APP, CONFIG);

  SwaggerModule.setup('/api/swagger', APP, DOCUMENT);

  await APP.listen(PORT, () =>
    console.log(`Server was started on port ${PORT}`),
  );
}

bootstrap();

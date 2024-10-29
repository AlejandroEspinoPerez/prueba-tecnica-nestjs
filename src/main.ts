import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UniqueConstraintFilter } from './common/filters/unique-constraint.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API de Restaurante')
    .setDescription('API para la gestión de clientes, restaurantes y órdenes')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Usar el filtro globalmente
  app.useGlobalFilters(new UniqueConstraintFilter());
  await app.listen(3000);
}
bootstrap();

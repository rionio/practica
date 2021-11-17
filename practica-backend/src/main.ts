import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //metodo principal de nestjs
  app.setGlobalPrefix('api'); //se debe conectar a la pagina bajo el prefijo http://localhost:port/api
  app.enableCors();
  await app.listen(AppModule.port); //con AppModule.port se puede configurar el puerto de manera dinamica
}
bootstrap();

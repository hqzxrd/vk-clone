import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import fastifyMultipart = require('@fastify/multipart');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {}
  );
  await app.register(fastifyCookie)
  await app.register(fastifyMultipart)
  app.setGlobalPrefix('api')
  app.enableCors()
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT')
  

  await app.listen(PORT, '0.0.0.0');
}
bootstrap();

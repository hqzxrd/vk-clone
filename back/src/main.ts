import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  await app.register(fastifyCookie)
  app.setGlobalPrefix('api')
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT')
  

  await app.listen(PORT, '0.0.0.0');
}
bootstrap();

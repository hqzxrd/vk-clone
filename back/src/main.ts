import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import { contentParser } from 'fastify-multer'
import { AuthAdapter } from './adapter/auth.adapter';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {}
  );
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT')
  const CLIENT_URL = configService.get('CLIENT_URL')

  await app.register(fastifyCookie)
  await app.register(contentParser)
  app.useStaticAssets({
    root: join(__dirname, '..', 'static')
  })
  app.setGlobalPrefix('api')
  app.enableCors({
    credentials: true,
    origin: CLIENT_URL
  })
  app.useWebSocketAdapter(new AuthAdapter(app))

  await app.listen(PORT, '0.0.0.0');
}
bootstrap();

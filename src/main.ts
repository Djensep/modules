import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './systems/customLogger/customLogger.service';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['debug', 'error', 'fatal', 'log', 'verbose'],
      bufferLogs: true,
    },
  );
  const logger = app.get(CustomLoggerService);

  app.useLogger(logger);
  await app.listen(process.env.PORT ?? 8000, '0.0.0.0');
}

bootstrap();

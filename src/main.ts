import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.enableCors({
    methods: 'GET,POST,PUT,DELETE',
  });

  await app.listen(process.env.PORT).then(() => {
    logger.log(`Microservice start on ${process.env.PORT}`);
  });
}
bootstrap();
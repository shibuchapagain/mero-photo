import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { HttpAdapterHost } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  // ✅ Global filters
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));

  // seed()
  //   .then(() => console.log('Seed completed'))
  //   .catch((error) => console.log(error));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

void bootstrap();

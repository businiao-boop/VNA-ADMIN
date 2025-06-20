// src/seeds/main.ts
import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);

  const seedService = appContext.get(SeedService);
  await seedService.run();

  await appContext.close();
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});

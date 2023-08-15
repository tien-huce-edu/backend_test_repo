import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "./config/config";
import { setupSwagger } from "./swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["warn", "error"],
  });

  setupSwagger(app);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({}));

  await app.listen(config.get("server.port") || 3000);
}

bootstrap();

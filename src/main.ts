import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./swagger";

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (): BadRequestException =>
        new BadRequestException("Validation error"),
    })
  );
  await app.listen(3000);
}
bootstrap();

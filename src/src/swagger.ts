import { INestApplication, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "./config/config";

export function setupSwagger(app: INestApplication): any {
  const logger: Logger = new Logger("Swagger");
  const swaggerEndpoint = config.get("swagger.path");

  const options = new DocumentBuilder()
    .setTitle(config.get("swagger.title"))
    .setDescription(config.get("swagger.description"))
    .setVersion(config.get("swagger.version"))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerEndpoint, app, document);
  logger.log(`Added swagger on endpoint ${swaggerEndpoint}`);
}

import { Controller, Get, Logger } from "@nestjs/common";
// import { LoggingInterceptor } from '../../interceptor/logging.interceptor';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@Controller("management")
// @UseInterceptors(LoggingInterceptor)
@ApiTags("management-controller")
export class ManagementController {
  logger = new Logger("ManagementController");

  @ApiExcludeEndpoint()
  @Get("/info")
  @ApiOperation({ summary: "Microservice Info" })
  @ApiResponse({
    status: 200,
    description: "Check if the microservice is up",
  })
  info(): any {
    return {
      activeProfiles: "dev",
      "display-ribbon-on-profiles": "dev",
    };
  }
}

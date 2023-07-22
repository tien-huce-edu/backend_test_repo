import { Body, Controller, Logger, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
// import { LoggingInterceptor } from '../../interceptor/logging.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth/auth.service";
import { UserLoginDTO } from "./user/user-login.dto";

@Controller("api")
// @UseInterceptors(LoggingInterceptor)
@ApiTags("user-jwt-controller")
export class UserJWTController {
  logger = new Logger("UserJWTController");

  constructor(private readonly authService: AuthService) {}

  @Post("/authenticate")
  @ApiOperation({ summary: "Authorization api retrieving token" })
  @ApiResponse({
    status: 201,
    description: "Authorized",
  })
  async authorize(
    @Req() req: Request,
    @Body() user: UserLoginDTO,
    @Res() res: Response
  ): Promise<any> {
    const jwt = await this.authService.login(user);
    res.setHeader("Authorization", "Bearer " + jwt.id_token);
    return res.json(jwt);
  }
}

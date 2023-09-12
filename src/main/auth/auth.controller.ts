import {
  Body,
  Controller,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import { AuthGuard, RolesGuard } from "../../security";
import { AuthService } from "./auth.service";
import { UserLoginGoogleDTO } from "./dto/user-login-google.dto";
import { UserLoginResponse } from "./dto/user-login-response.dto";
import { UserLoginDTO } from "./dto/user-login.dto";

@Controller("api/auth")
@ApiTags("api/auth")
export class AuthController {
  logger = new Logger("UserController");

  constructor(private readonly authService: AuthService) {}
  @Post("/login")
  @ApiOperation({ summary: "Authorization api retrieving token" })
  @ApiResponse({
    status: 201,
    description: "Authorized",
    type: UserLoginResponse,
  })
  async authorize(@Body() user: UserLoginDTO): Promise<any> {
    return await this.authService.login(user);
  }

  @Post("/social-login")
  @ApiOperation({ summary: "Login with Google" })
  @ApiResponse({
    status: 201,
    description: "Authorized",
    type: UserLoginResponse,
  })
  async loginWithGoogle(
    @Body() user: UserLoginGoogleDTO,
    @Res() res: Response
  ): Promise<any> {
    const jwt = await this.authService.loginWithGoogle(user);
    return jwt;
  }

  @Post("/logout")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: "success",
  })
  async logout(@Res() res: Response, @Req() req: any): Promise<any> {
    return await this.authService.logout(res, req);
  }
}

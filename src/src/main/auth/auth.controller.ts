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
import { AuthGuard, RolesGuard } from "../../security";
import { Roles } from "../../security/decorators/roles.decorator";
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
  @UseGuards(AuthGuard, RolesGuard)
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
  // @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles()
  @ApiResponse({
    status: 200,
    description: "success",
  })
  async logout(@Req() req: any): Promise<any> {
    return await this.authService.logout(req);
  }
}

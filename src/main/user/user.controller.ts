import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeaders, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ARR_HEADER_REQUEST } from "../../common/constants/constants";
import { AuthGuard, RolesGuard } from "../../security";
import { Roles } from "../../security/decorators/roles.decorator";
import { RoleType } from "../../security/role-type";
import { BaseHeaderDTO } from "../base/base.header";
import { CreateUserDTO } from "./dto/create-user.dto";
import { RequestQueryUserDTO } from "./dto/request-query-user.dto";
import { UserFindAllDTO } from "./dto/user-find-all.dto";
import { UserLoginDTO } from "./dto/user-login.dto";
import { UserUpdateDTO } from "./dto/user-update.dto";
import { UserService } from "./user.service";

@Controller("users")
@ApiTags("users")
export class UserController {
  logger = new Logger("UserController");

  constructor(private readonly userService: UserService) {}
  @Post("/login")
  // @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Authorization api retrieving token" })
  @ApiResponse({
    status: 200,
    description: "Authorized",
  })
  async authorize(@Body() user: UserLoginDTO): Promise<any> {
    return await this.userService.login(user);
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
    return await this.userService.logout(req);
  }

  @Post("/")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiBody({
    type: CreateUserDTO,
  })
  @ApiResponse({
    status: 201,
    description: "User registered successfully! The mail is sent to the user!",
  })
  async register(@Body() user: CreateUserDTO): Promise<any> {
    return await this.userService.registerNewUser(user);
  }

  @Put("/:id")
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({
    status: 200,
    description: "The record has been successfully updated.",
    type: UserUpdateDTO,
  })
  async updateUser(@Param("id") id: string, @Body() userDTO: UserUpdateDTO) {
    return await this.userService.update(+id, userDTO);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: "Find all account" })
  @ApiHeaders(ARR_HEADER_REQUEST)
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserFindAllDTO,
  })
  async findAll(@Headers() header: BaseHeaderDTO, @Query() query: RequestQueryUserDTO) {
    return await this.userService.findAll(header, query);
  }

  @Delete("/:id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({
    status: 200,
    description: "The record has been successfully updated.",
  })
  async deleteUser(@Param("id") id: string) {
    return await this.userService.delete(+id);
  }
}

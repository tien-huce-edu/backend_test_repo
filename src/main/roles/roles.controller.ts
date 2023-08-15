import { Controller, Get, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard, RolesGuard, RoleType } from "../../security";
import { Roles } from "../../security/decorators/roles.decorator";
import { RolesAllDTO } from "./dto/user-find-all.dto";
import { RolesService } from "./roles.service";

@ApiTags("roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get("/")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: "Find all roles" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RolesAllDTO,
  })
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.rolesService.findOne(+id);
  }
}

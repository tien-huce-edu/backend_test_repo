import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
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
import { METHOD } from "../../common/constants/constants";
import { AuthGuard, Roles, RolesGuard } from "../../security";
import { BaseHeaderDTO } from "../base/base.header";
import { DataTestDTO } from "./dto/data-test.dto";
import { FindAllMasterDataDTO } from "./dto/master-data.dto";
import { UpsertMasterDataDTO } from "./dto/upsert-master-data.dto";
import { MasterDataService } from "./master-data.service";

@Controller("api/master-data")
@ApiTags("MasterData")
export class MasterDataController {
  constructor(private readonly masterDataService: MasterDataService) {}
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("api/master-data", METHOD.POST)
  @ApiOperation({ summary: "create" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async createMasterData(
    @Body() body: UpsertMasterDataDTO,
    @Res() res: Response
  ) {
    return await this.masterDataService.createMasterData(body, res);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("api/master-data", METHOD.GET)
  @ApiOperation({ summary: "Find all" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindAllMasterDataDTO,
  })
  async findAll(@Headers() header: BaseHeaderDTO) {
    return await this.masterDataService.findAll(header);
  }

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("api/master-data/:id", METHOD.PUT)
  @ApiOperation({ summary: "update" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async updateMasterData(
    @Param("id") id: number,
    @Body() body: UpsertMasterDataDTO,
    @Res() res: Response
  ) {
    return await this.masterDataService.updateMasterData(+id, body, res);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("api/master-data/:id", METHOD.DELETE)
  @ApiOperation({ summary: "Delete" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async deleteMasterData(@Param("id") id: string, @Res() res: Response) {
    return await this.masterDataService.deleteMasterData(+id, res);
  }

  @Post("/testing")
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles("api/master-data", METHOD.POST)
  @ApiOperation({ summary: "create" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async createLocaltion(@Body() body: DataTestDTO, @Res() res: Response) {
    return await this.masterDataService.createTest(body, res);
  }
}

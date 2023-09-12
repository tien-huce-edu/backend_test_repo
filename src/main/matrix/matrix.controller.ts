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
import { FindAllMatrixDTO } from "./dto/matrix.dto";
import { UpsertMatrixDTO } from "./dto/upsert-matrix.dto";
import { MatrixService } from "./matrix.service";

@Controller("api/matrix")
@ApiTags("Matrix")
export class MatrixController {
  constructor(private readonly matrixService: MatrixService) {}
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("api/matrix", METHOD.POST)
  @ApiOperation({ summary: "create" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async createMatrix(@Body() body: UpsertMatrixDTO, @Res() res: Response) {
    return await this.matrixService.createMatrix(body, res);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("api/matrix", METHOD.GET)
  @ApiOperation({ summary: "Find all" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindAllMatrixDTO,
  })
  async findAll(@Headers() header: BaseHeaderDTO) {
    return await this.matrixService.findAll(header);
  }

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("api/matrix/:id", METHOD.PUT)
  @ApiOperation({ summary: "update" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async updateMatrix(
    @Param("id") id: number,
    @Body() body: UpsertMatrixDTO,
    @Res() res: Response
  ) {
    return await this.matrixService.updateMatrix(+id, body, res);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("api/matrix/:id", METHOD.DELETE)
  @ApiOperation({ summary: "Delete" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async deleteMatrix(@Param("id") id: string, @Res() res: Response) {
    return await this.matrixService.deleteMatrix(+id, res);
  }
}

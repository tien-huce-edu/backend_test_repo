import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { BaseResponseDto } from "../../../main/base/base-response.dto";

export class MatrixDTO {
  @IsOptional()
  @ApiProperty({
    example: "1",
    description: "id",
  })
  @Expose()
  id?: number;

  @ApiProperty({
    example: "api/matrix",
    description: "endpoint",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  endpoint: string;

  @ApiProperty({
    example: "GET",
    description: "method",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  method: string;

  @ApiProperty({
    example: "root",
    description: "page",
    required: true,
  })
  @IsNotEmpty()
  @Expose()
  @IsString()
  page: string;
}

export class FindAllMatrixDTO extends BaseResponseDto {
  @ApiProperty({
    description: "matrix",
    required: false,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => MatrixDTO)
  data: MatrixDTO;
}

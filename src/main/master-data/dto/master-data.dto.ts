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
import { BaseDTO } from "../../../main/base/base.dto";

export class MasterDataDTO extends BaseDTO {
  @ApiProperty({
    example: "admin",
    description: "code",
    required: true,
  })
  @IsNotEmpty()
  @Expose()
  @IsString()
  code: string;

  @ApiProperty({
    example: "Admin",
    description: "name",
  })
  @IsOptional()
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({
    example: "role",
    description: "type",
    required: true,
  })
  @IsNotEmpty()
  @Expose()
  @IsString()
  type: string;
}

export class FindAllMasterDataDTO extends BaseResponseDto {
  @ApiProperty({
    description: "matrix",
    required: false,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => MasterDataDTO)
  data: MasterDataDTO;
}

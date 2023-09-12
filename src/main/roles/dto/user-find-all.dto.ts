import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { BaseResponseDto } from "../../base/base-response.dto";
import { RoleDto } from "./role.dto";

export class RolesAllDTO extends BaseResponseDto {
  @ApiProperty({
    description: "personnel",
    required: false,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => RoleDto)
  data: RoleDto;
}

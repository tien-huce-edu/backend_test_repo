import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { BaseDTO } from "../../base/base.dto";

@Expose()
export class RoleDto extends BaseDTO {
  @ApiProperty({
    description: "rolename",
    required: true,
  })
  @IsString()
  @IsOptional()
  key: string;

  @ApiProperty({
    description: "description",
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;
}

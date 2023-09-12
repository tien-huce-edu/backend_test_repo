import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpsertMatrixDTO {
  @ApiProperty({
    example: "api/matrix",
    description: "endpoint",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  endpoint: string;

  @ApiProperty({
    example: "GET",
    description: "method",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  method: string;

  @ApiProperty({
    example: "root",
    description: "page",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  page: string;

  @ApiProperty({
    example: "[1,2]",
    isArray: true,
    description: "Array of permissions",
    required: true,
  })
  @Expose({ name: "roles" })
  @IsOptional()
  roles: any[];
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpsertMasterDataDTO {
  @ApiProperty({
    example: "admin",
    description: "code",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: "Admin",
    description: "name",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "role",
    description: "type",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  type: string;
}

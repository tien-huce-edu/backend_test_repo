import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class RequestQueryUserDTO {
  @ApiProperty({
    example: "username",
    description: "username",
    required: false,
  })
  @IsString()
  @IsOptional()
  username: string;
}

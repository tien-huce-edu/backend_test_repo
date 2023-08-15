import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { BaseDTO } from "../base/base.dto";

/**
 * An User DTO object.
 */
export class UserDTO extends BaseDTO {
  @ApiProperty({
    uniqueItems: true,
    example: "Username",
    description: "Username",
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: "Password",
    description: "Password",
    required: true,
  })
  password: string;
}

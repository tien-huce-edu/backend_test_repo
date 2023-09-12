import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

/**
 * A DTO representing a login user.
 */
export class UserLoginDTO {
  @ApiProperty({ description: "User password" })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: "Username" })
  @IsEmail()
  readonly username: string;
}

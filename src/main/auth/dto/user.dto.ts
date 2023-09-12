import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsDateString, IsEmail } from "class-validator";
import { BaseDTO } from "../../base/base.dto";

/**
 * An User DTO object.
 */
export class UserDTO extends BaseDTO {
  @ApiProperty({
    example: "Username",
    description: "Username",
    required: true,
  })
  @IsEmail()
  username: string;

  @ApiProperty({
    example: "Password",
    description: "Password",
    required: true,
  })
  password: string;

  @ApiProperty({
    example: "1",
    description: "status",
  })
  @Expose({ name: "status" })
  @IsBoolean()
  status: number;

  @ApiProperty({
    example: "28-07-2023",
    description: "last_login",
  })
  @Expose({ name: "last_login" })
  @IsDateString()
  lastLogin: Date | null;

  @Exclude()
  tblUserRoles: any[];
}

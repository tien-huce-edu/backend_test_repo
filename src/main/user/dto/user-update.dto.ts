import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

/**
 * An User DTO object.
 */
export class UserUpdateDTO {
  @ApiProperty({
    example: "fullname",
    description: "fullname",
    required: true,
  })
  @IsOptional()
  @IsString()
  fullname: string;

  @ApiProperty({
    example: "Username",
    description: "Username",
    required: true,
  })
  @IsEmail()
  username: string;

  @ApiProperty({
    isArray: true,
    description: "Array of permissions",
    required: true,
  })
  @IsOptional()
  roles: [];
}

import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsOptional, IsString } from "class-validator";

/**
 * An User DTO object.
 */
export class CreateUserDTO {
  @ApiProperty({
    example: "Username",
    description: "Username",
    required: true,
  })
  @IsEmail()
  username: string;

  @ApiProperty({
    example: "fullname",
    description: "fullname",
    required: true,
  })
  @IsOptional()
  @IsString()
  fullname: string;

  @ApiProperty({
    example: "Password",
    description: "Password",
    required: true,
  })
  password: string;

  @ApiProperty({
    isArray: true,
    description: "Array of permissions",
    required: true,
  })
  @Expose({ name: "roles" })
  @IsOptional()
  roles: any[];
}

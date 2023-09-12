import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

/**
 * A DTO representing a login user.
 */
export class UserLoginGoogleDTO {
  @ApiProperty({ description: "Access token" })
  @IsOptional()
  @IsString()
  readonly idToken: string;

  @ApiProperty({ description: "Name" })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: "photoUrl" })
  @IsOptional()
  @IsString()
  readonly photoUrl: string;

  @ApiProperty({ description: "firstName" })
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: "lastName" })
  @IsOptional()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ description: "provider" })
  @IsOptional()
  @IsString()
  readonly provider: string;

  @ApiProperty({ description: "Id" })
  @IsOptional()
  @IsString()
  readonly id: string;

  @ApiProperty({ description: "User login email" })
  @IsOptional()
  @IsEmail()
  readonly email: string;
}

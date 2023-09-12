import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsArray, IsEmail, IsNumber, IsString } from "class-validator";
import { MatrixDTO } from "../../../main/matrix/dto/matrix.dto";

/**
 * A DTO representing a login user.
 */
@Expose()
export class UserLoginResponse {
  @ApiProperty({ description: "User id" })
  @IsNumber()
  @Expose({ name: "id" })
  id: Number;

  @ApiProperty({ description: "User login name" })
  @IsEmail()
  username: string;

  @ApiProperty({ description: "User access token" })
  @IsString()
  @Expose({ name: "access_token" })
  access_token: string;

  @ApiProperty({ description: "Role" })
  @IsArray()
  role: MatrixDTO[];
}

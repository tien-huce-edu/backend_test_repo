import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsDateString, IsEmail, IsOptional } from "class-validator";
import { TblUserRoles } from "../../../entities/bi_report/tbl_user_roles.entity";
import { BaseDTO } from "../../base/base.dto";

/**
 * An User DTO object.
 */
export class UserDTO {
  @IsOptional()
  @ApiProperty({
    example: "1",
    description: "id",
  })
  @Expose({ name: "id" })
  id?: number;

  @ApiProperty({
    example: "fullname",
    description: "fullname",
    required: true,
  })
  @IsEmail()
  fullname: string;

  @ApiProperty({
    example: "Username",
    description: "Username",
    required: true,
  })
  @IsEmail()
  username: string;

  // @ApiProperty({
  //   example: "Password",
  //   description: "Password",
  //   required: true,
  // })
  // password: string;

  @ApiProperty({
    example: "1",
    description: "status",
  })
  @Expose({ name: "status" })
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    example: "28-07-2023",
    description: "last_login",
    name: "last_login",
  })
  @Expose({ name: "last_login" })
  @IsOptional()
  @IsDateString()
  lastLogin: Date | null;

  @Exclude()
  @IsOptional()
  tblUserRoles: TblUserRoles[];
}

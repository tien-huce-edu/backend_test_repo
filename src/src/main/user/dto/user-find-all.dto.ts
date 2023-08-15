import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { BaseResponseDto } from "../../../main/base/base-response.dto";
import { UserDTO } from "./user.dto";

export class UserFindAllDTO extends BaseResponseDto {
  @ApiProperty({
    description: "personnel",
    required: false,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => UserDTO)
  data: UserDTO;
}

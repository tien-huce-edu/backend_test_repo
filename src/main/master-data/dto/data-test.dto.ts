import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class DataTestDTO {
  @ApiProperty({
    example: "location",
    description: "location",
  })
  @Expose()
  @IsString()
  location: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, MaxLength } from "class-validator";

export class BaseTimeRange {
  @ApiProperty({
    description: "startDate iso YYYY-MM-DD",
    required: false,
    example: "2023-05-20",
  })
  @MaxLength(10)
  @IsDateString()
  @IsNotEmpty()
  readonly startDate: Date;

  @ApiProperty({
    description: "endDate iso YYYY-MM-DD",
    required: false,
    example: "2023-05-20",
  })
  @MaxLength(10)
  @IsDateString()
  @IsNotEmpty()
  readonly endDate: Date;
}

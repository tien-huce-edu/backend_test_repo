import { ApiProperty } from "@nestjs/swagger";

/**
 * A header base object.
 */
export class BaseHeaderDTO {
  @ApiProperty({
    example: "1",
    description: "page",
    required: false,
  })
  page: string;

  @ApiProperty({
    example: "20",
    description: "size",
    required: false,
  })
  size: string;

  @ApiProperty({
    description: "field sort",
    required: false,
  })
  field: string;

  @ApiProperty({
    description: "value sort DESC or ASC",
    required: false,
  })
  order: string;
}

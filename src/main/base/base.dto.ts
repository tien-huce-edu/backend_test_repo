import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDateString, IsOptional } from "class-validator";
import { BaseEntity } from "typeorm";

/**
 * A DTO base object.
 */
export class BaseDTO extends BaseEntity {
  @IsOptional()
  @ApiProperty({
    example: "1",
    description: "id",
  })
  id?: number;

  @ApiProperty({
    example: "28-07-2023",
    description: "created_at",
  })
  @Expose({ name: "created_at" })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: "28-07-2023",
    description: "updated_at",
  })
  @Expose({ name: "updated_at" })
  @IsDateString()
  updatedAt: Date | null;

  @ApiProperty({
    example: "28-07-2023",
    description: "deleted_at",
  })
  @Expose({ name: "deleted_at" })
  @IsDateString()
  deletedAt: Date | null;
}

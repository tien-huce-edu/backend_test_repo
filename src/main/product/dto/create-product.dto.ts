import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly category_id: number;
}

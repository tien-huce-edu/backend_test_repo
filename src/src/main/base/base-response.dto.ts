import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class BaseResponseDto {
  @ApiProperty()
  @Expose()
  total: number;
  @ApiProperty()
  @Expose()
  page: number;
  @Expose()
  data: any;

  constructor(total = 0, page = 0, data = []) {
    this.total = total;
    this.page = page;
    this.data = data;
  }
}

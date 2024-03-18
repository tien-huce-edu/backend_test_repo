import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";
import { BaseHeaderDTO } from "../base/base.header";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("api/product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Headers() headers: BaseHeaderDTO) {
    return await this.productService.findAll(headers);
  }

  @Get(":id")
  async getProduct(@Param("id") id: any, @Query("showCategory") showCat: any) {
    return await this.productService.findOne(+id, Boolean(showCat));
  }

  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productService.CreateProduct(product);
  }

  @Patch(":id")
  async updateCategory(
    @Param("id") id: any,
    @Body() product: UpdateProductDto
  ) {
    return await this.productService.updateProduct(+id, product);
  }
}

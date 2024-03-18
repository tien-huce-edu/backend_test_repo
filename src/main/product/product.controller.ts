import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";

@Controller("api/product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return await this.productService.findAll();
  }

  @Get(":id")
  async getProduct(@Param("id") id: any, @Query("showCategory") showCat: any){
    return await this.productService.findOne(+id, Boolean(showCat));
  }

  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productService.CreateProduct(product);
  }
}

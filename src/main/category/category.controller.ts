import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/ceate-category.dto";
import { ApiTags } from "@nestjs/swagger";
import { BaseHeaderDTO } from "../base/base.header";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("api/category")
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(@Headers() headers: BaseHeaderDTO): Promise<any> {
    return await this.categoryService.findAll(headers);
  }

  @Get(":id")
  async findOne(@Param("id") id: any, @Query("showProduct") showProd: any): Promise<any> {

    return await this.categoryService.findOne(+id, Boolean(showProd));
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryDto): Promise<any> {
    return await this.categoryService.createCategory(category);
  }

  @Patch(":id")
  async updateCategory(
    @Body() category: UpdateCategoryDto,
    @Param("id") id: any
  ): Promise<any> {
    return await this.categoryService.updateCategory(+id, category);
  }

  @Delete(":id")
  async deleteCategory(@Param("id") id: any): Promise<any> {
    return await this.categoryService.deleteCategory(+id);
  }
}

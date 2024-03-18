import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TblCategory } from "src/entities/tbl_category.entity";
import { Repository } from "typeorm";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { BaseHeaderDTO } from "../base/base.header";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(TblCategory)
    private readonly categoryRepository: Repository<TblCategory>
  ) {}

  async findAll(headers: BaseHeaderDTO): Promise<any> {
    let { page, size } = headers;
    try {
      const skipCount = (+page - 1) * +size;
      const data = await this.categoryRepository.find({
        skip: skipCount || 0,
        take: +size || 10,
      });
      const totalCount = await this.categoryRepository.count();
      const pageCount = Math.ceil(totalCount / +size);
      return {
        message: "Categories fetched successfully",
        data: data,
        pageCount: pageCount,
        totalCount: totalCount,
      };
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number, showProduct: boolean): Promise<any> {
    try {
      let resData;
      if (showProduct) {
        resData = await this.categoryRepository.findOne({
          where: { id },
          relations: ["products"],
        });
      } else {
        resData = await this.categoryRepository.findOne({ where: { id } });
      }
      return {
        message: "Category fetched successfully",
        data: resData,
      };
    } catch (error) {
      return error.message;
    }
  }

  async createCategory(category: any): Promise<any> {
    try {
      const resData = await this.categoryRepository.save(category);
      return {
        message: "Category created successfully",
        data: resData,
      };
    } catch (error) {
      return error.message;
    }
  }

  async updateCategory(id: number, category: UpdateCategoryDto): Promise<any> {
    try {
      const { name } = category;
      let updateData = {};

      !name && {
        status: "error",
        message: "Nothing to update",
      };

      name && (updateData = { name });

      await this.categoryRepository.update(id, updateData);
      return {
        status: "success",
        message: "Category updated successfully",
      };
    } catch (error) {
      return error.message;
    }
  }

  async deleteCategory(id: number): Promise<any> {
    try {
      await this.categoryRepository.delete(id);
      return {
        status: "success",
        message: "Category deleted successfully",
      };
    } catch (error) {
      return error.message;
    }
  }
}

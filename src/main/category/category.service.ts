import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TblCategory } from "src/entities/tbl_category.entity";
import type { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(TblCategory)
    private readonly categoryRepository: Repository<TblCategory>
  ) {}

  async findAll(): Promise<any> {
    try {
      const resData = await this.categoryRepository.find();
      return {
        message: "Categories fetched successfully",
        data: resData,
      };
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number, showProduct: boolean): Promise<any> {
    try {
      let resData
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

  async updateCategory(id: number, category: any): Promise<any> {
    try {
      const oldData = await this.categoryRepository.findOne({ where: { id } });
      await this.categoryRepository.update(id, category);
      const newData = await this.categoryRepository.findOne({ where: { id } });
      return {
        message: "Category updated successfully",
        data: {
          oldData,
          newData,
        },
      };
    } catch (error) {
      return error.message;
    }
  }

  async deleteCategory(id: number): Promise<any> {
    try {
      await this.categoryRepository.delete(id);
      const resData = await this.categoryRepository.find();
      return {
        message: "Category deleted successfully",
        data: resData,
      };
    } catch (error) {
      return error.message;
    }
  }
}

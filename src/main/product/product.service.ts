import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TblProduct } from "src/entities/tbl_product.entity";
import { Repository } from "typeorm";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(TblProduct)
    private readonly productRepository: Repository<TblProduct>
  ) {}

  async findAll(headers: any): Promise<any> {
    try {
      let { page, size } = headers;
      const skipCount = (+page - 1) * +size;
      const data = await this.productRepository.find({
        skip: skipCount || 0,
        take: +size || 10,
      });
      const totalCount = await this.productRepository.count();
      const pageCount = Math.ceil(totalCount / +size);
      return {
        message: "Products fetched successfully",
        data: data,
        pageCount: pageCount,
        totalCount: totalCount,
      };
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number, showCat: boolean): Promise<any> {
    let resData;
    try {
      if (showCat) {
        resData = await this.productRepository.findOne({
          where: { id },
          relations: ["category_id"],
        });
      } else {
        resData = await this.productRepository.findOne({ where: { id } });
      }
      return {
        message: "Product found",
        data: resData,
      };
    } catch (error) {
      return {
        message: error.message,
        data: null,
      };
    }
  }

  async CreateProduct(product: any): Promise<any> {
    try {
      const resData = await this.productRepository.save(product);
      return {
        message: "Product created successfully",
        data: resData,
      };
    } catch (error) {
      return error.message;
    }
  }

  async updateProduct(id: number, product: UpdateProductDto): Promise<any> {
    try {
      const { name, category_id } = product;
      let updateData = {};

      if (!name && !category_id) {
        return {
          message: "Nothing to update",
        };
      }

      name && (updateData = { ...updateData, name });
      category_id && (updateData = { ...updateData, category_id });
      
      await this.productRepository.update(id, updateData);
      return {
        message: "Product updated successfully",
      };
    } catch (error) {
      return error.message;
    }
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TblProduct } from "src/entities/tbl_product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(TblProduct)
    private readonly productRepository: Repository<TblProduct>
  ) {}

  async findAll(): Promise<any> {
    return await this.productRepository.find();
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
}

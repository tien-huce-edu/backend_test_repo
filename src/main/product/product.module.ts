import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TblProduct } from "src/entities/tbl_product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TblProduct])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

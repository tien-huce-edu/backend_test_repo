import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TblCategory } from "src/entities/tbl_category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TblCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

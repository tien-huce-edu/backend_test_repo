import { IsString } from "class-validator";
import { BaseEntity } from "./base/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TblCategory } from "./tbl_category.entity";


@Entity("tbl_product", { schema: "rocket_testing" })
export class TblProduct extends BaseEntity {
  @IsString()
  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @ManyToOne(() => TblCategory, (category) => category.products)
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category_id: TblCategory;
}

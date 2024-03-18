import { IsString } from "class-validator";
import { BaseEntity } from "./base/base.entity";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { TblProduct } from "./tbl_product.entity";

@Entity("tbl_category", { schema: "rocket_testing" })
export class TblCategory extends BaseEntity {
  @IsString()
  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @OneToMany(() => TblProduct, (product) => product.category_id)
  products: TblProduct[];
}

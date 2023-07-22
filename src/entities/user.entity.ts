import { Expose } from "class-transformer";
import { Column, Entity } from "typeorm";
import { config } from "../config/config";
import { BaseEntity } from "./base/base.entity";

@Entity("user", { schema: config.get("typeorm.database") })
export class User extends BaseEntity {
  @Column("varchar", { name: "username", length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  @Expose()
  password: string | null;
}

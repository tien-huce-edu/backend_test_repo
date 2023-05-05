import { Column, Entity } from "typeorm";

@Entity("rocket_position_bonus_salary", { schema: "rocket_personnel" })
export class RocketPositionBonusSalary {
  @Column("date", { name: "year" })
  year: string;

  @Column("varchar", { name: "position", length: 255 })
  position: string;

  @Column("float", { name: "ratio", precision: 12, default: () => "'1'" })
  ratio: number;
}

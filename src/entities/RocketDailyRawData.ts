import { Column, Entity, Index } from "typeorm";

@Index("id", ["date", "time", "personnelCode"], { unique: true })
@Entity("rocket_daily_raw_data", { schema: "rocket_personnel" })
export class RocketDailyRawData {
  @Column("int", { primary: true, name: "personnel_code" })
  personnelCode: number;

  @Column("date", { primary: true, name: "date" })
  date: string;

  @Column("time", { primary: true, name: "time" })
  time: string;
}

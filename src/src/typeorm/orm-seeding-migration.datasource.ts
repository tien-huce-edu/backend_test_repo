import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { config } from "../config/config";
import { MainSeeder } from "../database/seeds/main.seed";

const options: DataSourceOptions & SeederOptions = {
  type: config.get("typeorm.type"),
  database: config.get("typeorm.database"),
  host: config.get("typeorm.host"),
  port: config.get("typeorm.port"),
  username: config.get("typeorm.username"),
  password: config.get("typeorm.password"),
  entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],
  seeds: [MainSeeder],
};

console.log("seeding config: ", options);
export const seedingDataSource = new DataSource(options);
seedingDataSource.initialize();

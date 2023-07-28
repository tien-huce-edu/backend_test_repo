import { config } from "src/config/config";
import { MainSeeder } from "src/database/seeds/main.seed";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

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

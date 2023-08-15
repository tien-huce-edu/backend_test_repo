import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "../config/config";

function ormConfigBIDashboard(): TypeOrmModuleOptions {
  const orm = {
    name: config.get("typeorm.bi-db.name"),
    type: config.get("typeorm.bi-db.type"),
    database: config.get("typeorm.bi-db.database"),
    host: config.get("typeorm.bi-db.host"),
    port: config.get("typeorm.bi-db.port"),
    username: config.get("typeorm.bi-db.username"),
    password: config.get("typeorm.bi-db.password"),
    keepConnectionAlive: config.get("typeorm.bi-db.keepConnectionAlive"),
    logging: config.get("typeorm.bi-db.logging"),
    synchronize: config.get("typeorm.bi-db.synchronize"),
    entities: [__dirname + "/../entities/bi_report/*.entity{.ts,.js}"],
    migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],
    migrationsRun: config.get("typeorm.migrationsRun"),
  };
  return orm;
}

function ormConfigMKTReport(): TypeOrmModuleOptions {
  const orm = {
    name: config.get("typeorm.mkt-db.name"),
    type: config.get("typeorm.mkt-db.type"),
    database: config.get("typeorm.mkt-db.database"),
    host: config.get("typeorm.mkt-db.host"),
    port: config.get("typeorm.mkt-db.port"),
    username: config.get("typeorm.mkt-db.username"),
    password: config.get("typeorm.mkt-db.password"),
    keepConnectionAlive: config.get("typeorm.mkt-db.keepConnectionAlive"),
    logging: config.get("typeorm.mkt-db.logging"),
    synchronize: config.get("typeorm.mkt-db.synchronize"),
    entities: [__dirname + "/../entities/mkt_report/*.entity{.ts,.js}"],
    migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],
    migrationsRun: config.get("typeorm.migrationsRun"),
  };
  return orm;
}

export { ormConfigBIDashboard , ormConfigMKTReport };

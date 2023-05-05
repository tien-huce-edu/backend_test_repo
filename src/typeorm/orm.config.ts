import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'src/config/config';

function ormConfig(): TypeOrmModuleOptions {
  const orm = {
    name: config.get('typeorm.name'),
    type: config.get('typeorm.type'),
    database: config.get('typeorm.database'),
    host: config.get('typeorm.host'),
    port: config.get('typeorm.port'),
    username: config.get('typeorm.username'),
    password: config.get('typeorm.password'),
    keepConnectionAlive: config.get('typeorm.keepConnectionAlive'),
    logging: config.get('typeorm.logging'),
    synchronize: config.get('typeorm.synchronize'),
    entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    migrationsRun: config.get('typeorm.migrationsRun'),
  };
  console.log('orm config: ', orm);
  return orm;
}

export { ormConfig };

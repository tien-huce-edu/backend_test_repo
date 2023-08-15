import { RedisModule } from "@nestjs-modules/ioredis";
import { Module } from "@nestjs/common";
import { config } from "../../config/config";
import { RedisCacheService } from "./redis.service";
@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: config.get("redis.url"),
        db: config.get("redis.default-db"),
        password: config.get("redis.password"),
      },
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}

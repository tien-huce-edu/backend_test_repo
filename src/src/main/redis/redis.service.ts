import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../common/logger/logger.service";
import { config } from "../../config/config";

@Injectable()
export class RedisCacheService {
  logger = new LoggerService("RedisService");
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getCachedData(key: string) {
    try {
      let value = await this.redis.get(key);
      return JSON.parse(value);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async cacheData(key: string, value: any, ttl: number) {
    try {
      if (ttl) {
        await this.redis.set(key, JSON.stringify(value), "EX", ttl);
      } else {
        await this.redis.set(
          key,
          JSON.stringify(value),
          "EX",
          Number(config.get("ttl.default"))
        );
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async delCache(key: string) {
    try {
      await this.redis.del(key);
    } catch (error) {
      this.logger.error(error);
    }
  }

  generateCacheKey({
    path,
    apiName,
    keyName,
  }: {
    path: string;
    apiName: string;
    keyName: string;
  }) {
    return `${config.get(
      "redis.cache-key-name"
    )}:${path}:${apiName}:${keyName}`;
  }
}

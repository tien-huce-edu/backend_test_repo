import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RedisCacheService } from "./redis.service";

@Controller("api/redis")
@ApiTags("Redis")
export class RedisController {
  constructor(private readonly redisService: RedisCacheService) {}

  @Get()
  findAll() {
    return this.redisService.cacheData("abc", "123", 10);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.redisService.getCachedData("abc");
  }
}

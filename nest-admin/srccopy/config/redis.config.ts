import { ConfigService } from "@nestjs/config";
import { RedisOptions } from "ioredis";

export const redisConfig = (configService: ConfigService): RedisOptions => ({
  host: configService.get("redis.host"),
  port: parseInt(configService.get("redis.port") || "6379", 10),
  password: configService.get("redis.password") || undefined,
});

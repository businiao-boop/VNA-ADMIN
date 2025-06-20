import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    const redisConfig = this.configService.get("redis");

    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    });

    this.client.on("error", (err) => {
      console.error("❌ Redis 连接错误:", err);
    });

    this.client.on("connect", () => {
      console.log("✅ Redis 已连接");
    });
  }
  // 以后在任意模块使用 redis
  // constructor(private readonly redisService: RedisService) {}
  // async someAction() {
  //   const client = this.redisService.getClient();
  //   await client.set('key', 'value');
  // }
  getClient(): Redis {
    return this.client;
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}

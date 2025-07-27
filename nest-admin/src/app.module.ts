import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { JwtStrategy } from "@/common/guards/jwt.strategy";
import { CoreModule } from "./core/core.module";

import configuration from "./config/configuration";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [".env.local", `.env.${process.env.NODE_ENV}`, ".env"],
    }),
    DatabaseModule,
    RedisModule,
    CoreModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}

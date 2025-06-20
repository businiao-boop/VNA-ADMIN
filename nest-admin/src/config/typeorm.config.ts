import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
export const typeOrmConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: "mysql",
  host: configService.get("database.host"),
  port: configService.get("database.port"),
  username: configService.get("database.username"),
  password: configService.get("database.password"),
  database: configService.get("database.name"),
  autoLoadEntities: true,
  synchronize: true,
  // logging: true,
  // entities: ["dist/modules/**/*.entity{.ts,.js}"],
});


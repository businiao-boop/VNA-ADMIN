import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { typeOrmConfig } from "@/config/typeorm.config";
import { DataSource, DataSourceOptions } from "typeorm";
import { RoleSeedService } from "./seeds/role.seed";
import { UserSeedService } from "./seeds/user.seed";
import { Role } from "@/core/role/entities/role.entity";
import { User } from "@/core/user/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      // 配置阶段 的工厂函数，返回 DataSourceOptions（数据库连接配置）
      useFactory: (configService: ConfigService) => {
        return typeOrmConfig(configService)
      },
      // 可选，连接阶段 的工厂函数，它会接收到 useFactory 返回的 DataSourceOptions，并返回一个 DataSource 实例。
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = await new DataSource(options).initialize()
        return dataSource
      },
    }),
    TypeOrmModule.forFeature([Role, User])
  ],
  providers: [RoleSeedService, UserSeedService],
  exports: [RoleSeedService, UserSeedService],
})
export class DatabaseModule { }

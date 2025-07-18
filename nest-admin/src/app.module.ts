import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { JwtStrategy } from "@/common/guards/jwt.strategy"
import { UploadModule } from './modules/upload/upload.module';
import { MenuModule } from './core/menu/menu.module';
import { RoleModule } from './core/role/role.module';
import { PermissionModule } from './core/permission/permission.module';
import { RoleMenuPermissionModule } from './core/role-menu-permission/role-menu-permission.module';

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
    UploadModule,
    MenuModule,
    RoleModule,
    PermissionModule,
    RoleMenuPermissionModule
  ],
  providers: [JwtStrategy],
})
export class AppModule {}

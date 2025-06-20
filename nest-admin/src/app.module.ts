import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from "./core/user/user.module";
import { RoleModule } from './core/role/role.module';
import { MenuModule } from './core/menu/menu.module';
import { PermissionModule } from './core/permission/permission.module';
import { RoleMenuPermissionsModule } from './core/role-menu-permissions/role-menu-permissions.module';

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
    AuthModule,
    UserModule,
    RoleModule,
    MenuModule,
    PermissionModule,
    RoleMenuPermissionsModule
  ],
})
export class AppModule {}

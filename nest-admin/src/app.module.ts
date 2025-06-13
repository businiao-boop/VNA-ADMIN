import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { DatabaseModule } from "@/core/database/database.module";
import { RedisModule } from "@/core/redis/redis.module";

// import { DemoModule } from "./modules/demo/demo.module";
// import { UserModule } from "./core/user/user.module";
// import { MenuModule } from './core/menu/menu.module';
// import { RoleModule } from './core/role/role.module';
// import { PermissionModule } from './core/permission/permission.module';
import { AuthModule } from "./core/auth/auth.module";
import { UserModule } from './core/user/user.module';
import { RoleModule } from './core/role/role.module';
import { MenuModule } from './core/menu/menu.module';
import { PermissionModule } from './core/permission/permission.module';
import { RoleMenuPermissionModule } from './core/role-menu-permission/role-menu-permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [DatabaseConfig],
      load: [configuration],
      envFilePath: [".env.local", `.env.${process.env.NODE_ENV}`, ".env"],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    MenuModule,
    DatabaseModule,
    RedisModule,
    PermissionModule,
    RoleMenuPermissionModule,
    // DemoModule,
    // UserModule,
    // MenuModule,
    // RoleModule,
    // PermissionModule,
  ],
})
export class AppModule {}

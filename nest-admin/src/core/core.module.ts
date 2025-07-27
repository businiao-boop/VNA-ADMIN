import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { MenuModule } from "./menu/menu.module";
import { PermissionModule } from "./permission/permission.module";
import { AuthModule } from "./auth/auth.module";

/**
 * 核心模块
 * 包含用户、角色、菜单、权限、认证管理功能
 */
@Module({
  imports: [UserModule, RoleModule, MenuModule, PermissionModule, AuthModule],
  exports: [UserModule, RoleModule, MenuModule, PermissionModule, AuthModule],
})
export class CoreModule {}
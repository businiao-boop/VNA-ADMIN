import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "./entities/role.entity";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { RoleMenuEntity } from "./entities/role-menu.entity";
import { MenuEntity } from "../menu/entities/menu.entity";
import { PermissionEntity } from "../permission/entities/permission.entity";
import { RolePermissionEntity } from "./entities/role-permission";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity,
      RoleMenuEntity,
      MenuEntity,
      PermissionEntity,
      RolePermissionEntity,
    ]),
  ],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}

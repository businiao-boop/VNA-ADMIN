import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuEntity } from "./entities/menu.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenuPermissionModule } from "@/core/role-menu-permission/role-menu-permission.module"
@Module({
  imports: [
    TypeOrmModule.forFeature([MenuEntity]),
    RoleMenuPermissionModule
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}

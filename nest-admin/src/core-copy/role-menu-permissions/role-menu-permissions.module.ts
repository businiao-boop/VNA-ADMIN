import { Module } from '@nestjs/common';
import { RoleMenuPermissionsService } from './role-menu-permissions.service';
import { RoleMenuPermissionsController } from './role-menu-permissions.controller';
import { RoleMenuPermissionEntity } from "./entities/role-menu-permission.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleMenuPermissionEntity])],
  controllers: [RoleMenuPermissionsController],
  providers: [RoleMenuPermissionsService],
  exports: [RoleMenuPermissionsService],
})
export class RoleMenuPermissionsModule { }

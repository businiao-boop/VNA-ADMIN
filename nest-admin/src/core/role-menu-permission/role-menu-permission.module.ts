import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { RoleMenuPermissionService } from './role-menu-permission.service';
import { RoleMenuPermissionController } from './role-menu-permission.controller';

import { RoleMenuPermissionEntity } from "@/core/role-menu-permission/entities/role-menu-permission.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleMenuPermissionEntity
    ]),
  ],
  controllers: [RoleMenuPermissionController],
  providers: [RoleMenuPermissionService],
})
export class RoleMenuPermissionModule { }

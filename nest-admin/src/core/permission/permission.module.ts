import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PermissionEntity } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenuPermissionModule } from "@/core/role-menu-permission/role-menu-permission.module"

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity]), RoleMenuPermissionModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule { }

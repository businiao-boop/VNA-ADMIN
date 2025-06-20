import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { RoleEntity } from "./entities/role.entity";

import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleMenuPermissionEntity } from '@/core/role-menu-permission/entities/role-menu-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity,
      RoleMenuPermissionEntity
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}

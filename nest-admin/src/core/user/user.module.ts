import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "./entities/user.entity";
import { RoleEntity } from '@/core/role/entities/role.entity';
import { RoleMenuPermissionModule } from '@/core/role-menu-permission/role-menu-permission.module';
import { RoleMenuPermissionEntity } from '@/core/role-menu-permission/entities/role-menu-permission.entity';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { RoleModule } from '@/core/role/role.module';

@Module({
  imports: [RoleMenuPermissionModule, RoleModule, TypeOrmModule.forFeature([UserEntity, RoleMenuPermissionEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

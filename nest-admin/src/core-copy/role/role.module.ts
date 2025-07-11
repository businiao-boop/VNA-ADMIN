import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';

import { RoleEntity } from './entities/role.entity';

import { RoleMenuPermissionsModule } from '@/core-copy/role-menu-permissions/role-menu-permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), RoleMenuPermissionsModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}

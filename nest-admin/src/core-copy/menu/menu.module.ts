import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

import { MenuEntity } from "./entities/menu.entity"
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionModule } from "@/core-copy/permission/permission.module"

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity]), PermissionModule],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}

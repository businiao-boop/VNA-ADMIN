import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionModule } from "@/core/permission/permission.module"
import { MenuEntity } from "./entities/menu.entity";

import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Module({
  imports: [PermissionModule, TypeOrmModule.forFeature([MenuEntity])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}

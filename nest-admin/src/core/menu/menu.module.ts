import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { MenuEntity } from "./entities/menu.entity";

import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}

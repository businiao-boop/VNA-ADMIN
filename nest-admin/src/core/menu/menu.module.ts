import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";
import { Menu } from "./entities/menu.entity";

/**
 * 菜单模块
 */
@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
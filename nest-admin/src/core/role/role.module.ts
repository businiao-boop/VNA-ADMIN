import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "./entities/role.entity";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { RoleMenuEntity } from "./entities/role-menu.entity";
import { MenuEntity } from "../menu/entities/menu.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RoleMenuEntity, MenuEntity])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}

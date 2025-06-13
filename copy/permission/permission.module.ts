import { Module } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";
import { PermissionEntity } from "./entities/permission.entity";
import { MenuPermissionEntity } from "../menu/entities/menu_permission";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuEntity } from "../menu/entities/menu.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionEntity,
      MenuPermissionEntity,
      MenuEntity,
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}

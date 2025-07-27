import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { Permission } from "./entities/permission.entity";

/**
 * 权限模块
 */
@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
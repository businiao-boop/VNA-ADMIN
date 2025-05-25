import { Injectable } from "@nestjs/common";
import { BaseService } from "@/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PermissionEntity } from "./entities/permission.entity";
import { MenuPermissionEntity } from "../menu/entities/menu_permission";
@Injectable()
export class PermissionService extends BaseService<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    readonly permissionRepository: Repository<PermissionEntity>,
    @InjectRepository(MenuPermissionEntity)
    readonly menuPermissionRepository: Repository<MenuPermissionEntity>
  ) {
    super(permissionRepository);
  }

  // 查询某个权限的菜单和角色
  async getPermissionRelations(permissionId: number) {
    const permission = await this.permissionRepository.findOne({
      where: { id: permissionId },
      relations: ["menus", "roles"],
    });
    return {
      menus: permission?.menus,
      roles: permission?.roles,
    };
  }

  // 移除权限与某菜单绑定
  async removePermissionMenu(permissionId: number, menuId: number) {
    await this.menuPermissionRepository.delete({ permissionId, menuId });
  }
}

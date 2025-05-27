import { Injectable } from "@nestjs/common";
import { BaseService } from "@/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { PermissionEntity } from "./entities/permission.entity";
import { MenuPermissionEntity } from "../menu/entities/menu_permission";
import { MenuEntity } from "../menu/entities/menu.entity";
import { SavePermissionDto } from "./dto/save-permission.dto";
@Injectable()
export class PermissionService extends BaseService<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    readonly permissionRepository: Repository<PermissionEntity>,
    @InjectRepository(MenuPermissionEntity)
    readonly menuPermissionRepository: Repository<MenuPermissionEntity>,
    @InjectRepository(MenuEntity)
    readonly menuRepository: Repository<MenuEntity>
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

  async save(
    entity: SavePermissionDto
  ): Promise<PermissionEntity | PermissionEntity[]> {
    const { menuIds, ...rest } = entity;
    const permission = this.permissionRepository.create(rest);
    if (menuIds && menuIds.length > 0) {
      const menus = await this.menuRepository.findBy({ id: In(menuIds) });
      permission.menus = menus;
    }
    return super.save(entity);
  }
}

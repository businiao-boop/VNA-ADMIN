// src/modules/role/role.service.ts
import { RoleMenuEntity } from "./entities/role-menu.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In } from "typeorm";
import { BaseService } from "@/common/services/base.service";
import { RoleEntity } from "./entities/role.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SaveRoleDto } from "./dto/save-role.dto";
import { MenuEntity } from "../menu/entities/menu.entity";
import { RolePermissionEntity } from "./entities/role-permission";
import { PermissionEntity } from "../permission/entities/permission.entity";
@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(MenuEntity)
    readonly menuRepository: Repository<MenuEntity>,
    @InjectRepository(RoleMenuEntity)
    private readonly roleMenuRepository: Repository<RoleMenuEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>
  ) {
    super(roleRepository);
  }

  async save(entity: SaveRoleDto): Promise<RoleEntity | RoleEntity[]> {
    const { menuIds, permissions, ...rest } = entity;
    const role = this.roleRepository.create(rest);
    if (menuIds && menuIds.length) {
      const menus = await this.menuRepository.findBy({
        id: In(menuIds),
      });
      role.menus = menus;
    }
    if (permissions) {
      const permissionIds = Object.values(permissions)
        .map((id) => id)
        .flat();
      const ids = await this.permissionRepository.findBy({
        id: In(permissionIds),
      });
      role.permissions = ids;
    }
    return super.save(role);
  }

  softDeleteWithRelations(id: number) {
    return super.softDeleteWithRelations(id, {
      clearRelations: [
        {
          field: "menus",
          joinTableRepository: this.roleMenuRepository,
          condition: { roleId: id },
        },
        {
          field: "permissions",
          joinTableRepository: this.rolePermissionRepository,
          condition: { roleId: id },
        },
      ],
    });
  }
}

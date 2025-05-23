// src/modules/role/role.service.ts
import { RoleMenuEntity } from "./entities/role-menu.entity";
import { SetRoleMenusDto } from "./dto/set-role-menus.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In } from "typeorm";
import { BaseService } from "@/common/services/base.service";
import { RoleEntity } from "./entities/role.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { MenuEntity } from "../menu/entities/menu.entity";
@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(MenuEntity)
    readonly menuRepository: Repository<MenuEntity>,
    @InjectRepository(RoleMenuEntity)
    private readonly roleMenuRepository: Repository<RoleMenuEntity>
  ) {
    super(roleRepository);
  }

  async save(entity: CreateRoleDto) {
    const { menus, ...rest } = entity;
    const role = this.roleRepository.create(rest);
    if (menus && menus.length) {
      const menuIds = await this.menuRepository.findBy({
        id: In(menus),
      });
      role.menus = menuIds;
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
      ],
    });
  }
}

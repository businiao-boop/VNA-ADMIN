import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleDto } from './dto';
import { RoleMenuPermissionEntity } from "@/core/role-menu-permission/entities/role-menu-permission.entity"
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    @InjectRepository(RoleMenuPermissionEntity)
    private readonly rmpRepo: Repository<RoleMenuPermissionEntity>
  ) { }

  async findByIds(ids: number[]) {
    return this.roleRepo.findBy({ id: In(ids) });
  }

  async findByIdsWithRelations(ids: number[]) {
    return await this.roleRepo.find({
      where: { id: In(ids) },
      relations: ['menus'],
    });
  }
  async list() {
    return await this.roleRepo.find()
  }
  async info(roleId: number) {
    const role = await this.roleRepo.findOne({
      where: { id: roleId },
      relations: ['menus'],
    });
    if (!role) throw new NotFoundException('角色不存在');
    const menuIds = role.menus.map(menu => menu.id);
    const rmpList = await this.rmpRepo.find({
      where: { roleId: roleId, menuId: In(menuIds) },
      relations: ['permission'],
    });



    return {
      ...role,
      menuIds,
      rmpList
    }
  }
  async listAll() {
    // 1. 查询所有角色及其菜单
    const roles = await this.roleRepo.find({
      relations: ['menus'],
    });

    const roleIds = roles.map(role => role.id);
    const menuIds = roles.flatMap(role => role.menus.map(menu => menu.id));

    // 2. 查询 role_menu_permission，包含关联的权限实体
    const rmpList = await this.rmpRepo.find({
      where: {
        roleId: In(roleIds),
        menuId: In(menuIds),
      },
      relations: ['permission'],
    });


    return {
      roles,
      menuIds,
      rmpList
    }
  }



  async save(dto: RoleDto) {
    if (dto.id) {
      return await this.update(dto)
    } else {
      return this.roleRepo.save(dto)
    }
  }
  async update(dto: RoleDto) {
    const role = await this.roleRepo.findOne({ where: { id: dto.id } });
    if (!role) {
      throw new NotFoundException('角色不存在');
    }

    // 避免用 dto 直接覆盖（例如 role.permissionIds 是空可能会被误删）
    Object.assign(role, dto);
    return this.roleRepo.save(role);
  }
}

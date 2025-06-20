import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindOptionsWhere } from 'typeorm';

import { RoleDto, QueryRoleDto, PaginationDto } from './dto/index.dto';
import { RoleMenuPermissionDto } from "@/core/role-menu-permissions/dto/index.dto"
import { RoleMenuPermissionsService } from '@/core/role-menu-permissions/role-menu-permissions.service';

import { BaseService } from '@/common/base/base.service';
import { RoleEntity } from './entities/role.entity';

import { buildWhere } from '@/common/utils/buildWhere';
@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    private readonly rmpService: RoleMenuPermissionsService,
  ) {
    super(roleRepo);
  }


  async listAndCount(body?: QueryRoleDto, page?: PaginationDto) {
    const filter = {
      where: body
    }
    return await this.findAllAndCount(filter, page);
  }
  async list(body: QueryRoleDto | QueryRoleDto[]) {
    const filter = {
      where: body
    }
    return await this.findAll(filter);
  }

  async save(roleDto: RoleDto) {
    const { code, id, menuList, ...rest } = roleDto;
    const existing = await this.findOne({
      where: [{ id }, { code }]
    });

    const role = this.roleRepo.create(existing || {});
    if (existing) {
      Object.assign(role, rest);
    } else {
      Object.assign(role, { ...roleDto, code });
    }

    const roleRes = await this.roleRepo.save(role);


    const insert: RoleMenuPermissionDto[] = []

    if (menuList) {
      for (const menu of menuList) {
        for (const permission of menu.permissionIds) {
          insert.push({
            roleId: roleRes.id,
            menuId: menu.id,
            permissionId: permission,
          })
        }
      }
    }
    // 先删除中间表关联的旧数据，再重新保存
    this.rmpService.deleteByRoleId(roleRes.id);
    await this.rmpService.saveBatch(insert)
    return roleRes;
  }

  async info(id: number) {

    const role = await this.findOne({
      where: {
        id
      },
      relations: [
        'roleMenuPermissions',
        'roleMenuPermissions.menu',
        'roleMenuPermissions.permission'
      ]
    })
    // console.log(res);
    // const role = await this.roleRepo.createQueryBuilder('role')
    //   .leftJoinAndSelect('role.roleMenuPermissions', 'rmp')
    //   .leftJoinAndSelect('rmp.menu', 'menu')
    //   .leftJoinAndSelect('rmp.permission', 'permission')
    //   .where('role.id = :id', { id })
    //   .getOne();

    if (!role) throw new NotFoundException('角色不存在');
    // 转换为目标结构
    const menuMap = new Map<number, any>();
    const { roleMenuPermissions, ...rest } = role;

    for (const rmp of roleMenuPermissions) {
      const menu = rmp.menu;
      const permission = rmp.permission;

      if (!menuMap.has(menu.id)) {
        // 初始化菜单对象
        menuMap.set(menu.id, {
          ...menu,
          permissions: [],
        });
      }

      // 添加 permission 到对应菜单下
      const menuRes = menuMap.get(menu.id);
      menuRes.permissions.push(permission);
    }
    // 构造最终返回
    return {
      ...rest,
      menuList: Array.from(menuMap.values()),
    };
  }
}

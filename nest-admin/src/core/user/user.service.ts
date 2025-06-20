import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDto, QueryUserDto, PaginationDto } from "./dto/index.dto";

import { UserEntity } from './entities/user.entity';

import * as bcrypt from "bcryptjs";

import { BaseService } from "@/common/base/base.service";
import { RoleService } from '@/core/role/role.service';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private readonly roleService: RoleService
  ) {
    super(userRepo);
  }

  async save(userDto: UserDto) {
    const { password, id, username, roleIds, ...rest } = userDto;
    const existing = await this.userRepo.findOne({
      where: [{ id: userDto.id }, { username }]
    });

    const user = this.userRepo.create(existing || {});
    if (existing) {
      Object.assign(user, rest);
    } else {
      Object.assign(user, userDto);
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (roleIds && roleIds.length) {
      user.roles = await this.roleService.list({ id: roleIds });
    }
    return this.userRepo.save(user);
  }

  async list(body?: QueryUserDto, page?: PaginationDto) {
    const filter = {
      where: { ...body }
    }
    return this.findAllAndCount(filter, page)
  }

  async info(id: number, username?: string) {
    return await this.findOne({ where: [{ id }, { username: username }] });
  }

  async infoUserProfile(id?: number, username?: string) {
    const user = await this.findOne({
      where: [{ id }, { username: username }],
      relations: ['roles', "roles.roleMenuPermissions", 'roles.roleMenuPermissions.menu',
        'roles.roleMenuPermissions.permission']
    });

    const menuMap = new Map<number, any>();
    const roles: object[] = [];
    const permissionKeys: string[] = [];

    for (const role of user.roles) {
      const { roleMenuPermissions, ...roleInfo } = role
      for (const rmp of role.roleMenuPermissions || []) {
        const menu = rmp.menu;
        const permission = rmp.permission;

        // 合并多个角色的菜单权限，按菜单 ID 聚合
        if (!menuMap.has(menu.id)) {
          menuMap.set(menu.id, {
            ...menu,
            permissions: [],
          });
        }

        const permissionList = menuMap.get(menu.id).permissions;

        // 检查是否已存在相同权限
        const exists = permissionList.some(p => p.id === permission.id);
        if (!exists) {
          permissionList.push({
            ...permission,
            menuPermissionKey: `${menu.routerName}:${permission.code}`,
          });
          permissionKeys.push(`${menu.routerName}:${permission.code}`)
        }
      }
      roles.push(roleInfo)
    }

    return {
      ...user,
      roles,
      permissionKeys,
      menuList: Array.from(menuMap.values())
    };
  }

}

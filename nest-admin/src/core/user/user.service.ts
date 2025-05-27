import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@/common/services/base.service";
import { Repository, In } from "typeorm";
import * as bcrypt from "bcryptjs";

import { UserEntity } from "./entities/user.entity";
import { UserRoleEntity } from "./entities/user-role.entity";
import { RoleEntity } from "../role/entities/role.entity";
import { SaveUserDto } from "./dto/save-user.dto";
@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {
    super(userRepository); // 把 User 仓库传给基类
  }

  async save(entity: SaveUserDto): Promise<UserEntity | UserEntity[]> {
    const { roles, ...rest } = entity;
    const user = this.userRepository.create(rest);
    if (user.password) {
      const saltRounds = 15;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
    if (roles && roles.length > 0) {
      const roleIds = await this.roleRepository.findBy({
        id: In(roles),
      });
      user.roles = roleIds;
    }
    return super.save(user);
  }

  softDeleteWithRelations(id: number) {
    return super.softDeleteWithRelations(id, {
      clearRelations: [
        {
          field: "roles",
          joinTableRepository: this.userRoleRepository,
          condition: { userId: id },
        },
      ],
    });
  }

  async getUserProfile(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        "roles",
        "roles.menus",
        // "roles.permissions",
        "roles.menus.permissions", // 如果你想合并菜单下的权限
      ],
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const menuMap = new Map<number, any>();
    const permissionMap: Record<number, number[]> = {};

    for (const role of user.roles) {
      for (const menu of role.menus) {
        if (!menuMap.has(menu.id)) {
          // 克隆 menu 对象，避免原始对象被修改
          const { permissions, ...rest } = menu;
          menuMap.set(menu.id, rest);
        }

        // 初始化 permission 数组
        if (!permissionMap[menu.id]) {
          permissionMap[menu.id] = [];
        }

        for (const perm of menu.permissions || []) {
          if (!permissionMap[menu.id].includes(perm.id)) {
            permissionMap[menu.id].push(perm.id);
          }
        }
      }
    }
    const { password, ...rest } = user;

    return {
      ...rest,
      menus: Array.from(menuMap.values()),
      permissions: permissionMap,
    };
  }
}

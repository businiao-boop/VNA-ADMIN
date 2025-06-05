import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@/common/services/base.service";
import { Repository, In } from "typeorm";
import * as bcrypt from "bcryptjs";

import { UserEntity } from "./entities/user.entity";
import { UserRoleEntity } from "./entities/user-role.entity";
import { RoleEntity } from "../role/entities/role.entity";
import { SaveUserDto } from "./dto/save-user.dto";

import { buildRouteTree } from "@/common/utils/route.util";
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
      relations: ["roles", "roles.menus", "roles.menus.permissions"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const menuMap = new Map<number, any>();
    const permissionMap = new Map<number, Set<number>>();
    if (user.roles) {
      for (const role of user.roles) {
        for (const menu of role.menus) {
          if (!menuMap.has(menu.id)) {
            const { permissions, ...rest } = menu;
            menuMap.set(menu.id, rest);
          }

          if (!permissionMap.has(menu.id)) {
            permissionMap.set(menu.id, new Set());
          }

          for (const perm of menu.permissions || []) {
            permissionMap.get(menu.id)?.add(perm.id);
          }
        }
      }
    }

    const permissions: Record<number, string> = {};
    for (const [menuId, permSet] of permissionMap.entries()) {
      const permSetArr = Array.from(permSet);
      const permStr =
        "0b" +
        permSetArr
          .map((v) => Number(v)) // 转换为数字
          .reduce((pre, cur) => pre | cur, 0) // 按位或运算
          .toString(2) // 转回二进制字符串（去掉了 0b）
          .padStart(8, "0");
      permissions[menuId] = permStr;
    }

    const { password, roles, ...restUser } = user;

    return {
      ...restUser,
      // menus: Array.from(menuMap.values()),
      routes: buildRouteTree(Array.from(menuMap.values())),
      permissions,
    };
  }
}

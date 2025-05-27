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

  getUserProfile(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: [
        "roles",
        "roles.menus",
        // "roles.permissions",
        "roles.menus.permissions", // 如果你想合并菜单下的权限
      ],
    });
  }
}

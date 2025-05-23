import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@/common/services/base.service";
import { Repository, In } from "typeorm";
import * as bcrypt from "bcryptjs";

import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
// import { SetUserRolesDto } from "./dto/set-user-roles.dto";
import { UserRoleEntity } from "./entities/user-role.entity";
import { RoleEntity } from "../role/entities/role.entity";
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

  async save(entity: CreateUserDto): Promise<CreateUserDto> {
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
}

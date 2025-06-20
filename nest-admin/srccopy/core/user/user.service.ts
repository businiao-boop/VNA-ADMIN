import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { Repository, DataSource, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from "@/common/services/base.service";

import { UserDto } from "./dto";

import { UserEntity } from './entities/user.entity';
import { RoleService } from '@/core/role/role.service';
import { RoleMenuPermissionService } from "@/core/role-menu-permission/role-menu-permission.service"
import { RoleMenuPermissionEntity } from "@/core/role-menu-permission/entities/role-menu-permission.entity"

import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RoleMenuPermissionEntity) private readonly rmpRepo: Repository<RoleMenuPermissionEntity>,
    private readonly roleService: RoleService,
    private readonly dataSource: DataSource,
    private readonly rmpService: RoleMenuPermissionService,
  ) {
  }
  async findOne(identifier: string | number) {
    const where = typeof identifier === 'string' ? { username: identifier } : { id: identifier };
    return this.userRepo.findOne({ where, relations: ['roles', 'roles.menus'] });
  }

  async softDeleteWithRelations(id: number) {
    // const user = await this.userRepo.softDelete(id);
    await this.dataSource.transaction(async manager => {
      // 删除中间表关联记录
      await manager
        .createQueryBuilder()
        .delete()
        .from('user_role') // ⚠️ 中间表名称，可能是 user_roles_role 或你 @JoinTable 指定的 name
        .where('userId = :id', { id })
        .execute();

    });

    return true
  }


  async findByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }
  async findById(id?: number) {
    if (!id) return null;
    return this.userRepo.findOne({ where: { id } });
  }
  async list() {
    const users = await this.userRepo.find({
      relations: ['roles'],
    });
    return users.map(user => ({
      ...user,
      roleIds: user.roles.map(role => role.id),
    }));
  }
  async save(dto: UserDto) {
    // ✅ 更新普通字段（排除 id, username, roleIds, password）
    const { id, username, roleIds, password, ...rest } = dto;
    const existing = await this.userRepo.findOne({
      where: [{ id: dto.id }, { username }]
    });

    const user = this.userRepo.create(existing || {});
    if (!existing) {
      Object.assign(user, dto);
    } else {
      // ✅ 更新字段
      Object.assign(user, rest);
    }

    // ✅ 加密密码
    if (user.password) {
      const saltRounds = 15;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }

    // ✅ 加载角色实体
    if (roleIds && roleIds.length > 0) {
      user.roles = await this.roleService.findByIds(roleIds);
    } else {
      user.roles = [];
    }
    return this.userRepo.save(user);
  }
  async getUserProfile(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) throw new UnauthorizedException("用户不存在");
    const roleIds = user.roles.map(r => r.id);
    // 加载菜单
    const role = await this.roleService.findByIdsWithRelations(roleIds);

    // const menuIds = role.flatMap(rm => rm.menus.map(m => m.id));
    const menus = role.flatMap(rm => rm.menus)
    const menuIds = menus.map(t => t.id)

    // 加载权限
    const rmp = await this.rmpRepo.find({
      where: { roleId: In(roleIds), menuId: In(menuIds) },
      relations: ['permission'],
    });


    const permissions = rmp.map(p => p.permission);

    return {
      ...user,
      menus: menus,
      permissions: permissions,
    };
  }
}

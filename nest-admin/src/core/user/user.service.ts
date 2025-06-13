import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDto, CreateUserDto } from "./dto";

import { UserEntity } from './entities/user.entity';
import { RoleService } from '@/core/role/role.service';

import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private readonly roleService: RoleService,
  ) { }
  async findOne(identifier: string | number) {
    const where = typeof identifier === 'string' ? { username: identifier } : { id: identifier };
    return this.userRepo.findOne({ where, relations: ['roles', 'roles.menus'] });
  }



  async findByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }
  async findById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }
  async save(dto: UserDto) {
    if (dto.id) {
      return await this.update(dto)
    } else {
      return await this.create(dto)
    }
  }

  async create(dto: UserDto) {
    const existing = await this.findByUsername(dto.username);//注册时检查username是否存在
    if (existing) {
      throw new ConflictException('用户已存在');
    }

    const { password, roleIds, ...rest } = dto;
    const user = this.userRepo.create(rest);
  // ✅ 加密密码
    if (user.password) {
      const saltRounds = 15;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
    // ✅ 加载角色实体
    if (roleIds && roleIds.length > 0) {
      user.roles = await this.roleService.findByIds(roleIds);
    }

    return this.userRepo.save(user);
  }

  async update(dto: UserDto) {
    const { id, password, roleIds, ...rest } = dto;

    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // ✅ 更新普通字段（排除 password 和 roleIds）
    Object.assign(user, rest);

    // ✅ 更新密码（如有）
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // ✅ 更新角色（如有）
    if (roleIds?.length) {
      user.roles = await this.roleService.findByIds(roleIds);
    } else {
      user.roles = [];
    }

    return this.userRepo.save(user);
  }

}

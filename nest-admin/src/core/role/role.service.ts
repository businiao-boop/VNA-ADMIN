import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto, UpdateRoleDto, RoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>
  ) { }

  async findByIds(ids: number[]) {
    return this.roleRepo.findBy({ id: In(ids) });
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

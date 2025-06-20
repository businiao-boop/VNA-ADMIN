import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { RoleMenuPermissionEntity } from './entities/role-menu-permission.entity';

@Injectable()
export class RoleMenuPermissionService {
  constructor(
    @InjectRepository(RoleMenuPermissionEntity)
    private readonly rmpRepo: Repository<RoleMenuPermissionEntity>
  ) { }
  async findByRoleIds(roleIds: number[]) {
    return await this.rmpRepo.findBy({ roleId: In(roleIds) })
  }
}

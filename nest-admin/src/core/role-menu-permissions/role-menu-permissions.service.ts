import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleMenuPermissionEntity } from './entities/role-menu-permission.entity';
import { RoleMenuPermissionDto } from './dto/index.dto';
import { BaseService } from '@/common/base/base.service';

@Injectable()
export class RoleMenuPermissionsService extends BaseService<RoleMenuPermissionEntity> {
  constructor(
    @InjectRepository(RoleMenuPermissionEntity)
    private readonly roleMenuPermissionsRepo: Repository<RoleMenuPermissionEntity>,
  ) {
    super(roleMenuPermissionsRepo);
  }

  async deleteByRoleId(roleId: number) {
    console.log(roleId, "roleId");

    if (!roleId) return
    await this.roleMenuPermissionsRepo.delete({ roleId })
  }
  async saveBatch(dto: RoleMenuPermissionDto[]) {
    console.log(dto, "dto");

    return await this.roleMenuPermissionsRepo.save(dto);
  }
}

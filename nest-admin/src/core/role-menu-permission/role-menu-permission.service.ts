import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleMenuPermissionEntity } from './entities/role-menu-permission.entity';
import { BaseService } from '@/common/base/base.service';
import { Repository } from 'typeorm';
import { SaveRmpDto } from "./dto/rmp.dto"
@Injectable()
export class RoleMenuPermissionService extends BaseService<RoleMenuPermissionEntity> {
  constructor(
    @InjectRepository(RoleMenuPermissionEntity)
    private readonly rmpRepo: Repository<RoleMenuPermissionEntity>
  ) {
    super(rmpRepo);
  }
  async deleteByRoleId(roleId: number) {
    return await this.rmpRepo.delete({ roleId });
  }
  async deleteByMenuId(menuId: number) {
    return await this.rmpRepo.delete({ menuId });
  }
  async batchSave(rmpList: SaveRmpDto[]) {
    return await this.rmpRepo.save(rmpList);
  }
}

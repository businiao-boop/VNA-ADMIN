import { BaseService } from '@/common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { RoleMenuPermissionService } from '@/core/role-menu-permission/role-menu-permission.service';
import { SavePermissionDto, QueryPermissionDto, PaginationDto } from './dto/permission.dto';
@Injectable()
export class PermissionService extends BaseService<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
    private readonly rmpRepo: RoleMenuPermissionService
  ) {
    super(permissionRepo);
  }
  async save(permission: SavePermissionDto) {
    const { id, code, ...rest } = permission;
    const existing = await this.findOne({
      where: [{ code }, { id }]
    });
    const permissionEntity = this.permissionRepo.create(existing || permission);
    if (existing) {
      Object.assign(permissionEntity, rest);
    }
    return this.permissionRepo.save(permissionEntity);
  }

  async list(query?: QueryPermissionDto, page?: PaginationDto) {
    return await this.findAll({ where: query }, page);
  }
  async info(id: number) {
    return await this.findOne({ where: { id } });
  }
}

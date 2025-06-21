import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionDto, QueryPermissionDto, PaginationDto } from './dto/index.dto';
import { BaseService } from '@/common/base/base.service';
@Injectable()
export class PermissionService extends BaseService<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>
  ) {
    super(permissionRepo);
  }

  async list(body?: QueryPermissionDto) {
    const filter = {
      where: { ...body }
    }
    return this.findAll(filter);
  }

  async listAndCount(body?: QueryPermissionDto, page?: PaginationDto) {
    const filter = {
      where: body
    }
    return await this.findAllAndCount(filter, page);
  }

  async save(dto: PermissionDto) {
    const { id, code, ...rest } = dto;
    const existing = await this.findOne({
      where: [{ code }, { id }]
    });
    console.log('existing', existing);

    const permission = this.permissionRepo.create(existing || {})
    if (existing) {
      Object.assign(permission, rest);
    } else {
      Object.assign(permission, dto);
    }
    return this.permissionRepo.save(permission);
  }
}

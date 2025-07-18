import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { BaseService } from '@/common/base/base.service';
import { QueryRoleDto, SaveRoleDto, PaginationDto } from './dto/role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {
    super(roleRepo);
  }

  async save(role: SaveRoleDto) {
    const { id, code, ...rest } = role;
    const existing = await this.findOne({
      where: [{ code }, { id }]
    });
    const roleEntity = this.roleRepo.create(existing || role);
    if (existing) {
      Object.assign(roleEntity, rest);
    }
    return this.roleRepo.save(roleEntity);
  }

  async list(query?: QueryRoleDto, page?: PaginationDto) {
    const filter = {
    };
    if (query) {
      Object.assign(filter, query);
    }
    return await this.findAll(filter, page);
  }

  async info(id: number) {
    // const user = await this.findOne({
    //   where: [{ id }, { username: username }],
    //   relations: ['roles', "roles.roleMenuPermissions", 'roles.roleMenuPermissions.menu',
    //     'roles.roleMenuPermissions.permission'],
    // });
    return this.findOne({
      where: { id },
      relations: [
        'rmp'
      ]
    })
    return await this.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.softDeleteWithRelations(id);
  }
}

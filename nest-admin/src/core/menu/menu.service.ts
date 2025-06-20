import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { PermissionService } from '@/core/permission/permission.service';
import { BaseService } from '@/common/base/base.service';
import { MenuEntity } from './entities/menu.entity';

import { MenuDto, QueryMenuDto, PaginationDto } from './dto/index.dto';
@Injectable()
export class MenuService extends BaseService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepo: Repository<MenuEntity>,
    private readonly permissionService: PermissionService
  ) { super(menuRepo) }

  async list(body?: QueryMenuDto, page?: PaginationDto) {
    const filter = {
      where: { ...body }
    }
    return this.findAllAndCount(filter, page)
  }

  async listRelationRequestPermission(body?: QueryMenuDto, page?: PaginationDto) {
    const filter = {
      where: { ...body },
      relations: ['permissions'],
      order: {
        sort: 'ASC'
      }
    }
    return this.findAll(filter);
  }

  async save(menuDto: MenuDto) {
    const { id, routerName, permissionIds, ...rest } = menuDto;
    const existing = await this.menuRepo.findOne({ where: [{ id }, { routerName }] })
    const menu = this.menuRepo.create(existing || {});
    if (existing) {
      Object.assign(menu, rest)
    } else {
      Object.assign(menu, menuDto)
    }

    if (permissionIds) {
      menu.permissions = await this.permissionService.findAll({
        where: { id: In(permissionIds) }
      })
    } else {
      menu.permissions = [];
    }
    return this.menuRepo.save(menu)
  }

  async info(id: number) {
    const menu = await this.findOne({
      where: { id },
      relations: ['permissions']
    })
    return menu;
  }
}

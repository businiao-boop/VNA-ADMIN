import { Injectable, NotFoundException } from '@nestjs/common';
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

  async list(body?: QueryMenuDto) {
    const filter = {
      where: { ...body },
      order: { sort: "ASC" },
    }
    return this.findAll(filter)
  }
  async listAndCount(body?: QueryMenuDto, page?: PaginationDto) {
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
    const { id, routerName, permissions, ...rest } = menuDto;
    const existing = await this.menuRepo.findOne({ where: [{ id }, { routerName }] })
    const menu = this.menuRepo.create(existing || {});
    if (existing) {
      Object.assign(menu, rest)
    } else {
      Object.assign(menu, menuDto)
    }

    if (permissions) {
      menu.permissions = await this.permissionService.findAll({
        where: { id: In(permissions.map(permission => permission.id)) }
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
    if (!menu) throw new NotFoundException('菜单不存在');
    const { permissions, ...rest } = menu;
    return {
      ...rest,
      permissionIds: permissions.map(permission => permission.id)
    };
  }
}

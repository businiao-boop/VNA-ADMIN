import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RoleMenuPermissionService } from '@/core/role-menu-permission/role-menu-permission.service';
import { SaveMenuDto, QueryMenuDto, PaginationDto } from './dto/menu.dto';
import { BaseService } from '@/common/base/base.service';
import { MenuEntity } from './entities/menu.entity';
@Injectable()
export class MenuService extends BaseService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepo: Repository<MenuEntity>,
    private readonly rmp: RoleMenuPermissionService
  ) { super(menuRepo) }
  async save(menuDto: SaveMenuDto) {
    const { id, path, permissionIds, ...rest } = menuDto;
    let existing: MenuEntity | null = null;
    if (id !== undefined && id !== null) {
      existing = await this.menuRepo.findOne({ where: { id } });
    }
    const menu = this.menuRepo.create(existing || menuDto);
    if (existing) {
      Object.assign(menu, rest);
    }

    const menuRes = await this.menuRepo.save(menu);
    if (permissionIds) {
      await this.rmp.deleteByMenuId(menuRes.id)
      this.rmp.batchSave(permissionIds.map(permissionId => ({ menuId: menuRes.id, permissionId })))
    } else {
      await this.rmp.deleteByMenuId(menuRes.id)
    }
    return menuRes;
  }

  async list(body?: QueryMenuDto, page?: PaginationDto) {
    console.log(body, "body");

    const filter = {
      where: { ...body },
      order: { order: "ASC" },
    }
    return this.findAll(filter, page)
  }

  async info(id: number) {
    return await this.findOne({ where: { id } })
  }
  async remove(id: number) {
    return await this.softDeleteWithRelations(id)
  }
}

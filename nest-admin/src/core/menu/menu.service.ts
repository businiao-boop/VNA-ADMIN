import { Injectable, NotFoundException } from '@nestjs/common';
import { MenuDto } from './dto/index.dto';
import { MenuEntity } from "./entities/menu.entity";
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionService } from "@/core/permission/permission.service"

@Injectable()
export class MenuService {

  constructor(
    @InjectRepository(MenuEntity) private readonly menuRepo: Repository<MenuEntity>,
    private readonly permService: PermissionService
  ) {
  }
  async save(dto: MenuDto) {
    // ✅ 更新普通字段
    const { id, routerName, ...rest } = dto;
    const existing = await this.menuRepo.findOne({
      where: [{ id: dto.id }, { routerName: dto.routerName }]
    });
    const menu = this.menuRepo.create(existing || dto);
    if (existing) {
      Object.assign(menu, rest);
    }
    if (dto.permissionIds) {
      menu.permissions = await this.permService.findByIds(dto.permissionIds);
    }
    console.log(menu.permissions);

    return await this.menuRepo.save(menu);

  }
  async info(menuId: number) {
    const menu = await this.menuRepo.findOne({
      where: { id: menuId },
      relations: ['permissions']
    });
    if (!menu) throw new NotFoundException('菜单不存在');
    return {
      ...menu,
      permissionIds: menu.permissions.map(role => role.id)
    };
  }

  async list() {
    return await this.menuRepo.find();
  }

  async listRelations() {
    const menu = await this.menuRepo.find({
      relations: ['permissions']
    });
    if (!menu) throw new NotFoundException('菜单不存在');
    return menu;
  }
}

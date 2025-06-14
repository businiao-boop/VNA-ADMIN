import { Injectable } from '@nestjs/common';
import { MenuDto } from './dto/index.dto';
import { MenuEntity } from "./entities/menu.entity";
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuService {

  constructor(
    @InjectRepository(MenuEntity) private readonly menuRepo: Repository<MenuEntity>
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
    return await this.menuRepo.save(menu);

  }

  async list() {
    return await this.menuRepo.find({
      relations: ['permissions', 'roles'],
    });
  }
}

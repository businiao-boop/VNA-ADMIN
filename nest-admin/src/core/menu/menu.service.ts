import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { SaveMenuDto } from './dto/menu.dto';
import { BaseService } from '@/common/base/base.service';
import { MenuEntity } from './entities/menu.entity';
@Injectable()
export class MenuService extends BaseService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepo: Repository<MenuEntity>,
  ) { super(menuRepo) }
  async save(menuDto: SaveMenuDto) {
    const { id, path, permissionIds, ...rest } = menuDto;
    return menuDto;
  }
}

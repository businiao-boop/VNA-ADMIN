import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { BaseService } from "@/common/services/base.service";
import { MenuEntity } from "./entities/menu.entity";
import { PermissionEntity } from "../permission/entities/permission.entity";

import { SaveMenuDto } from "./dto/save-menu.dto";

@Injectable()
export class MenuService extends BaseService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    readonly menuRepository: Repository<MenuEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>
  ) {
    super(menuRepository);
  }



  async save(entity: SaveMenuDto): Promise<MenuEntity | MenuEntity[]> {
    const { permissionIds, ...rest } = entity;
    const menu = this.menuRepository.create(rest);
    if (permissionIds && permissionIds.length > 0) {
      const permissions = await this.permissionRepository.findBy({
        id: In(permissionIds),
      });
      menu.permissions = permissions;
    }
    return super.save(menu);
  }
}

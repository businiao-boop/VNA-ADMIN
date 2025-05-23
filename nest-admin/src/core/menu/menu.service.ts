import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BaseService } from "@/common/services/base.service";
import { MenuEntity } from "./entities/menu.entity";
@Injectable()
export class MenuService extends BaseService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    readonly menuRepository: Repository<MenuEntity>
  ) {
    super(menuRepository);
  }
}

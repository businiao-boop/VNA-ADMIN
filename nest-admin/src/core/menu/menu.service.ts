import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseService } from "@/common/base/base.service";
import { Menu } from "./entities/menu.entity";
import { CreateMenuDto } from "./dto/menu.dto";

/**
 * 菜单服务
 */
@Injectable()
export class MenuService extends BaseService<Menu> {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>
  ) {
    super(menuRepository);
  }

  /**
   * 创建菜单
   */
  async createMenu(dto: CreateMenuDto): Promise<Menu> {
    const menu = this.menuRepository.create(dto);
    return await this.menuRepository.save(menu);
  }

  /**
   * 更新菜单
   */
  async updateMenu(id: number, dto: CreateMenuDto): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
    });

    if (!menu) {
      throw new NotFoundException("菜单不存在");
    }

    Object.assign(menu, dto);
    return await this.menuRepository.save(menu);
  }



  /**
   * 获取菜单详情
   */
  async getMenuDetail(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
    });

    if (!menu) {
      throw new NotFoundException("菜单不存在");
    }

    return menu;
  }
}
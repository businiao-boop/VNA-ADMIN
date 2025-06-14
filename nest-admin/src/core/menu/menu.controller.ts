import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuDto } from './dto/index.dto';


@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post("save")
  async save(@Body() dto: MenuDto) {
    return await this.menuService.save(dto);
  }

  @Post("list")
  async list() {
    return await this.menuService.list();
  }

}

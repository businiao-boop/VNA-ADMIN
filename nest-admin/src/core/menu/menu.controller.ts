import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { SaveMenuDto } from './dto/menu.dto';
import { Public } from '@/common/decorators';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Public()
  @Post("save")
  async save(@Body() menuDto: SaveMenuDto) {
    return await this.menuService.save(menuDto);
  }
}

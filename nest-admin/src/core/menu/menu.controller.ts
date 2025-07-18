import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { SaveMenuDto, PaginationDto, QueryMenuDto, InfoMenuDto } from './dto/menu.dto';
import { Public } from '@/common/decorators';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Public()
  @Post("save")
  async save(@Body() menuDto: SaveMenuDto) {
    return await this.menuService.save(menuDto);
  }

  @Public()
  @Post("list")
  async list(@Body() menuDto?: QueryMenuDto, @Query() query?: PaginationDto) {
    return await this.menuService.list(menuDto, query);
  }

  @Public()
  @Post("info")
  async info(@Body() menuDto: InfoMenuDto) {
    return await this.menuService.info(menuDto.id);
  }

  @Public()
  @Post("remove")
  async remove(@Body() menuDto: InfoMenuDto) {
    return await this.menuService.remove(menuDto.id);
  }
}

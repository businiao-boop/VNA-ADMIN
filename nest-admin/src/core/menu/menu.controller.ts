import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuDto, QueryMenuDto, PaginationDto } from './dto/index.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post("save")
  save(@Body() menuDto: MenuDto) {
    return this.menuService.save(menuDto);
  }
  @Post("list")
  list(@Body() body: QueryMenuDto) {
    return this.menuService.list(body);
  }

  @Post("listAndCount")
  listAndCount(@Body() body: QueryMenuDto, @Query() page: PaginationDto) {
    return this.menuService.listAndCount(body, page);
  }

  @Post("listRelationRequestPermission")
  listRelationRequestPermission(@Body() body: QueryMenuDto, @Query() page: PaginationDto) {
    return this.menuService.listRelationRequestPermission(body, page);
  }


  @Post("info")
  info(@Body() body: { id: number }) {
    return this.menuService.info(body.id);
  }
}

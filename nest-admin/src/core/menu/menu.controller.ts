import { Controller, Post, Body, Query, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { MenuService } from "./menu.service";
import { CreateMenuDto, QueryMenuDto } from "./dto/menu.dto";
import { PaginationDto } from "@/common/dto";
import { Public } from "@/common/decorators";

/**
 * 菜单控制器
 */
@ApiTags("菜单管理")
@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * 查询所有菜单数据
   */
  @Public()
  @Post("list")
  @ApiOperation({ summary: "查询所有菜单数据" })
  async getMenuList(@Body() query: QueryMenuDto) {
    const data = await this.menuService.findAll({
      where: query,
      order: { sort: "ASC" },
    });

    return data;
  }

  /**
   * 分页查询菜单数据
   */
  @Public()
  @Post("page")
  @ApiOperation({ summary: "分页查询菜单数据" })
  @ApiQuery({ name: "pageNum", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  async getMenuPage(
    @Query(ValidationPipe) pagination: PaginationDto,
    @Body() query: QueryMenuDto
  ) {
    const { data, total } = await this.menuService.findAllAndCount(
      { where: query, order: { sort: "ASC", createdAt: "ASC" } },
      pagination
    );

    return { data: data, total: total + 1 };
  }

  /**
   * 创建/更新菜单
   */
  @Public()
  @Post("save")
  @ApiOperation({ summary: "创建/更新菜单" })
  async saveMenu(@Body() dto: CreateMenuDto) {
    if (dto.id) {
      const menu = await this.menuService.updateMenu(dto.id, dto);
      return { message: "更新成功", data: menu };
    } else {
      const menu = await this.menuService.createMenu(dto);
      return { message: "创建成功", data: menu };
    }
  }

  /**
   * 获取菜单详情
   */
  @Public()
  @Post("detail")
  @ApiOperation({ summary: "获取菜单详情" })
  async getMenuDetail(@Body("id") id: number) {
    const menu = await this.menuService.getMenuDetail(id);
    return menu
  }



  /**
   * 软删除菜单
   */
  @Public()
  @Post("delete")
  @ApiOperation({ summary: "软删除菜单" })
  async deleteMenu(@Body("id") id: number) {
    await this.menuService.softDeleteWithRelations(id);
    return { message: "删除成功" };
  }
}
import { Controller, Post, Body, Query, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { RoleService } from "./role.service";
import { CreateRoleDto, QueryRoleDto } from "./dto/role.dto";
import { PaginationDto } from "@/common/dto";
import { Public } from "@/common/decorators";

/**
 * 角色控制器
 */
@ApiTags("角色管理")
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * 查询所有角色数据
   */
  @Public()
  @Post("list")
  @ApiOperation({ summary: "查询所有角色数据" })
  async getRoleList(@Body() query: QueryRoleDto) {
    const data = await this.roleService.findAll({
      where: query,
    });
    return { data };
  }

  /**
   * 分页查询角色数据
   */
  @Public()
  @Post("page")
  @ApiOperation({ summary: "分页查询角色数据" })
  @ApiQuery({ name: "pageNum", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  async getRolePage(
    @Query(ValidationPipe) pagination: PaginationDto,
    @Body() query: QueryRoleDto
  ) {
    const { data, total } = await this.roleService.findAllAndCount(
      { where: query },
      pagination
    );
    return { data, total };
  }

  /**
   * 创建/更新角色
   */
  @Public()
  @Post("save")
  @ApiOperation({ summary: "创建/更新角色" })
  async saveRole(@Body() dto: CreateRoleDto) {
    if (dto.id) {
      const role = await this.roleService.updateRole(dto.id, dto);
      return { message: "更新成功", data: role };
    } else {
      const role = await this.roleService.createRole(dto);
      return { message: "创建成功", data: role };
    }
  }

  /**
   * 获取角色详情
   */
  @Public()
  @Post("detail")
  @ApiOperation({ summary: "获取角色详情" })
  async getRoleDetail(@Body("id") id: number) {
    const role = await this.roleService.getRoleDetail(id);
    return { data: role };
  }

  /**
   * 软删除角色
   */
  @Public()
  @Post("delete")
  @ApiOperation({ summary: "软删除角色" })
  async deleteRole(@Body("id") id: number) {
    await this.roleService.softDeleteWithRelations(id);
    return { message: "删除成功" };
  }
}
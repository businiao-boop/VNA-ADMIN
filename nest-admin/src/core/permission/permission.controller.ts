import { Controller, Post, Body, Query, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { PermissionService } from "./permission.service";
import { CreatePermissionDto, QueryPermissionDto, AssignPermissionDto } from "./dto/permission.dto";
import { PaginationDto } from "@/common/dto";
import { Public } from "@/common/decorators";

/**
 * 权限控制器
 */
@ApiTags("权限管理")
@Controller("permission")
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  /**
   * 查询所有权限数据
   */
  @Public()
  @Post("list")
  @ApiOperation({ summary: "查询所有权限数据" })
  async getPermissionList(@Body() query: QueryPermissionDto) {
    const data = await this.permissionService.findAll({
      where: query,
    });
    return { data };
  }

  /**
   * 分页查询权限数据
   */
  @Public()
  @Post("page")
  @ApiOperation({ summary: "分页查询权限数据" })
  @ApiQuery({ name: "pageNum", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  async getPermissionPage(
    @Query(ValidationPipe) pagination: PaginationDto,
    @Body() query: QueryPermissionDto
  ) {
    const { data, total } = await this.permissionService.findAllAndCount(
      { where: query },
      pagination
    );
    return { data, total };
  }

  /**
   * 创建/更新权限
   */
  @Public()
  @Post("save")
  @ApiOperation({ summary: "创建/更新权限" })
  async savePermission(@Body() dto: CreatePermissionDto) {
    if (dto.id) {
      const permission = await this.permissionService.updatePermission(dto.id, dto);
      return { message: "更新成功", data: permission };
    } else {
      const permission = await this.permissionService.createPermission(dto);
      return { message: "创建成功", data: permission };
    }
  }

  /**
   * 分配权限给角色
   */
  @Public()
  @Post("assign")
  @ApiOperation({ summary: "分配权限给角色" })
  async assignPermissions(@Body() dto: AssignPermissionDto) {
    await this.permissionService.assignPermissionsToRole(dto);
    return dto.roleId;
  }

  /**
   * 获取角色的权限列表
   */
  @Public()
  @Post("role-permissions")
  @ApiOperation({ summary: "获取角色的权限列表" })
  async getRolePermissions(@Body("roleId") roleId: number) {
    const permissions = await this.permissionService.getRolePermissions(roleId);
    return { data: permissions };
  }

  /**
   * 检查用户权限
   */
  @Public()
  @Post("check")
  @ApiOperation({ summary: "检查用户权限" })
  async checkPermission(
    @Body("userId") userId: number,
    @Body("menuId") menuId: number,
    @Body("action") action: string
  ) {
    const hasPermission = await this.permissionService.checkUserPermission(
      userId,
      menuId,
      action
    );
    return { data: { hasPermission } };
  }

  /**
   * 软删除权限
   */
  @Public()
  @Post("delete")
  @ApiOperation({ summary: "软删除权限" })
  async deletePermission(@Body("id") id: number) {
    await this.permissionService.softDeleteWithRelations(id);
    return { message: "删除成功" };
  }
}
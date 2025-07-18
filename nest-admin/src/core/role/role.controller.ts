import { Controller, Query, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { SaveRoleDto, PaginationDto, QueryRoleDto, InfoRoleDto } from "./dto/role.dto";
import { Public } from '@/common/decorators';
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }
  @Public()
  @Post("save")
  async save(@Body() body: SaveRoleDto) {
    return await this.roleService.save(body);
  }
  @Public()
  @Post("list")
  async list(@Body() body?: QueryRoleDto, @Query() query?: PaginationDto) {
    return await this.roleService.list(body, query);
  }

  @Public()
  @Post("info")
  async info(@Body() body: InfoRoleDto) {
    return await this.roleService.info(body.id);
  }
  @Public()
  @Post("remove")
  async remove(@Body() body: InfoRoleDto) {
    return await this.roleService.remove(body.id);
  }
}

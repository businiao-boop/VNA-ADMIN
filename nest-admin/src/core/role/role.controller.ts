import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
// import { Pagination } from "@/common/dto"
import { RoleDto, QueryRoleDto, PaginationDto } from './dto/index.dto';
import { info } from 'console';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post("listAndCount")
  listAndCount(@Body() body: QueryRoleDto, @Query() query?: PaginationDto) {
    return this.roleService.listAndCount(body, query);
  }
  @Post("list")
  list(@Body() body: QueryRoleDto | QueryRoleDto[],) {
    return this.roleService.list(body);
  }

  @Post("info")
  info(@Body() body: { id: number }) {
    return this.roleService.info(body.id);
  }

  @Post("save")
  save(@Body() body: RoleDto) {
    return this.roleService.save(body);
  }

  @Post("delete")
  remove(@Body("id") id: number) {
    return this.roleService.softDeleteWithRelations(id);
  }

}

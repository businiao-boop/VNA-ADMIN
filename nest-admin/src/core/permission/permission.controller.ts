import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionDto, QueryPermissionDto, PaginationDto } from './dto/index.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }
  @Post("list")
  list(@Body() body: QueryPermissionDto) {
    return this.permissionService.list(body);
  }

  @Post("info")
  info(@Body("id") id: number) {
    return this.permissionService.findOne({ where: { id } });
  }
  @Post("listAndCount")
  listAndCount(@Body() body: QueryPermissionDto, @Query() query?: PaginationDto) {
    return this.permissionService.listAndCount(body, query);
  }

  @Post("save")
  save(@Body() body: PermissionDto) {
    return this.permissionService.save(body);
  }

  @Post("delete")
  remove(@Body("id") id: number) {
    return this.permissionService.softDeleteWithRelations(id);
  }
}

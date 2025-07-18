import { Controller, Query, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { SavePermissionDto, InfoPermissionDto, QueryPermissionDto, PaginationDto } from './dto/permission.dto';
import { Public } from '@/common/decorators';
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Public()
  @Post("save")
  async save(@Body() permissionDto: SavePermissionDto) {
    return await this.permissionService.save(permissionDto);
  }

  @Public()
  @Post("info")
  async info(@Body() permissionDto: InfoPermissionDto) {
    return await this.permissionService.info(permissionDto.id);
  }

  @Public()
  @Post("list")
  async list(@Body() query?: QueryPermissionDto, @Query() page?: PaginationDto) {
    return await this.permissionService.list(query, page);
  }
}

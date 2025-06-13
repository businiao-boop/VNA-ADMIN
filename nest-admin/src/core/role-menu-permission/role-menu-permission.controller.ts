import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleMenuPermissionService } from './role-menu-permission.service';
import { CreateRoleMenuPermissionDto } from './dto/create-role-menu-permission.dto';
import { UpdateRoleMenuPermissionDto } from './dto/update-role-menu-permission.dto';

@Controller('role-menu-permission')
export class RoleMenuPermissionController {
  constructor(private readonly roleMenuPermissionService: RoleMenuPermissionService) {}

  @Post()
  create(@Body() createRoleMenuPermissionDto: CreateRoleMenuPermissionDto) {
    return this.roleMenuPermissionService.create(createRoleMenuPermissionDto);
  }

  @Get()
  findAll() {
    return this.roleMenuPermissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleMenuPermissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleMenuPermissionDto: UpdateRoleMenuPermissionDto) {
    return this.roleMenuPermissionService.update(+id, updateRoleMenuPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleMenuPermissionService.remove(+id);
  }
}

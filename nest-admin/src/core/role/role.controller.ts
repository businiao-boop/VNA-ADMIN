import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto';


@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post("save")
  create(@Body() createRoleDto: RoleDto) {
    return this.roleService.save(createRoleDto);
  }

  @Post("list")
  list() {
    return this.roleService.list();
  }

}

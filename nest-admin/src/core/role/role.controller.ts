import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto';
import { info } from 'console';


@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post("save")
  create(@Body() createRoleDto: RoleDto) {
    return this.roleService.save(createRoleDto);
  }

  @Post("info")
  info(@Body() body: { id: number }) {
    return this.roleService.info(body.id);
  }
  @Post("list")
  list() {
    return this.roleService.list();
  }

}

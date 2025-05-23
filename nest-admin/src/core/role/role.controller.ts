// src/modules/role/role.controller.ts
import { Body, Controller, Post, Query } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { SetRoleMenusDto } from "./dto/set-role-menus.dto";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post("list")
  list(@Query() { page, pageSize }: { page: number; pageSize: number }) {
    return this.roleService.list({ page, pageSize });
  }

  @Post("info")
  info(@Body() body: Omit<UpdateRoleDto, "menus">) {
    return this.roleService.find(body);
  }

  @Post("save")
  save(@Body() body: CreateRoleDto) {
    return this.roleService.save(body);
  }

  @Post("remove")
  remove(@Body("id") id: number) {
    return this.roleService.softDeleteWithRelations(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleMenuPermissionService } from './role-menu-permission.service';
import { CreateRoleMenuPermissionDto } from './dto/create-role-menu-permission.dto';
import { UpdateRoleMenuPermissionDto } from './dto/update-role-menu-permission.dto';

@Controller('role-menu-permission')
export class RoleMenuPermissionController {
  constructor(private readonly roleMenuPermissionService: RoleMenuPermissionService) {}

}

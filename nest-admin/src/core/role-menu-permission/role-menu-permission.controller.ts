import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleMenuPermissionService } from './role-menu-permission.service';

@Controller('role-menu-permission')
export class RoleMenuPermissionController {
  constructor(private readonly roleMenuPermissionService: RoleMenuPermissionService) { }

}

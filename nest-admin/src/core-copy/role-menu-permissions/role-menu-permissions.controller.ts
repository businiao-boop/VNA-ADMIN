import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleMenuPermissionsService } from './role-menu-permissions.service';

@Controller('role-menu-permissions')
export class RoleMenuPermissionsController {
  constructor(private readonly roleMenuPermissionsService: RoleMenuPermissionsService) { }

}

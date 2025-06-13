import { Injectable } from '@nestjs/common';
import { CreateRoleMenuPermissionDto } from './dto/create-role-menu-permission.dto';
import { UpdateRoleMenuPermissionDto } from './dto/update-role-menu-permission.dto';

@Injectable()
export class RoleMenuPermissionService {
  create(createRoleMenuPermissionDto: CreateRoleMenuPermissionDto) {
    return 'This action adds a new roleMenuPermission';
  }

  findAll() {
    return `This action returns all roleMenuPermission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleMenuPermission`;
  }

  update(id: number, updateRoleMenuPermissionDto: UpdateRoleMenuPermissionDto) {
    return `This action updates a #${id} roleMenuPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleMenuPermission`;
  }
}
